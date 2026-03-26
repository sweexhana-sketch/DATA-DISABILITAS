import { AsyncLocalStorage } from 'node:async_hooks';
import nodeConsole from 'node:console';
import { skipCSRFCheck } from '@auth/core';
import Credentials from '@auth/core/providers/credentials';
import { authHandler, initAuthConfig } from '@hono/auth-js';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { hash, verify } from 'argon2';
import { Hono } from 'hono';
import { contextStorage, getContext } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { proxy } from 'hono/proxy';
import { bodyLimit } from 'hono/body-limit';
import { requestId } from 'hono/request-id';
import { createHonoServer } from 'react-router-hono-server/aws-lambda';
import { serializeError } from 'serialize-error';
import ws from 'ws';
import NeonAdapter from './adapter.js';
import { getHTMLForErrorPage } from './get-html-for-error-page.js';
import { API_BASENAME, api } from './route-builder.js';
neonConfig.webSocketConstructor = ws;

const als = new AsyncLocalStorage<{ requestId: string }>();

for (const method of ['log', 'info', 'warn', 'error', 'debug'] as const) {
  const original = nodeConsole[method].bind(console);

  console[method] = (...args: unknown[]) => {
    const requestId = als.getStore()?.requestId;
    if (requestId) {
      original(`[traceId:${requestId}]`, ...args);
    } else {
      original(...args);
    }
  };
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = NeonAdapter(pool);

export const app = new Hono();

// Diagnostic routes (register early)
app.get('/api/health-db', async (c) => {
  console.log('[Diagnostic] Health check triggered');
  const start = Date.now();
  try {
    const result = await pool.query('SELECT NOW()');
    return c.json({ 
      status: 'ok', 
      db_time: result.rows[0].now,
      duration: `${Date.now() - start}ms`,
      env: { has_url: !!process.env.DATABASE_URL }
    });
  } catch (err: any) {
    return c.json({ 
      status: 'error', 
      message: err.message, 
      stack: err.stack,
      duration: `${Date.now() - start}ms`
    }, 500);
  }
});

app.get('/api/setup-db', async (c) => {
  console.log('[Diagnostic] Setup check triggered');
  try {
    const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    return c.json({ tables: tables.rows.map(r => r.table_name) });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

app.use('*', requestId());

app.use('*', (c, next) => {
  const requestId = c.get('requestId');
  return als.run({ requestId }, () => next());
});

app.use(contextStorage());

app.onError((err, c) => {
  if (c.req.method !== 'GET') {
    return c.json(
      {
        error: 'An error occurred in your app',
        details: serializeError(err),
      },
      500
    );
  }
  return c.html(getHTMLForErrorPage(err), 200);
});

if (process.env.CORS_ORIGINS) {
  app.use(
    '/*',
    cors({
      origin: process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()),
    })
  );
}
for (const method of ['post', 'put', 'patch'] as const) {
  app[method](
    '*',
    bodyLimit({
      maxSize: 4.5 * 1024 * 1024, // 4.5mb to match vercel limit
      onError: (c) => {
        return c.json({ error: 'Body size limit exceeded' }, 413);
      },
    })
  );
}

const authConfig = initAuthConfig((c) => ({
  secret: c.env.AUTH_SECRET || process.env.AUTH_SECRET || 'fallback-secret-for-dev',
  trustHost: true,
  pages: {
    signIn: '/account/signin',
    signOut: '/account/logout',
    error: '/account/error',
  },
  basePath: '/api/auth',
  skipCSRFCheck: true,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      id: 'credentials-signin',
      name: 'Credentials Sign in',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          console.log(`[Authorize] Signin attempt for: ${credentials.email}`);
          const { email, password } = credentials;
          if (!email || !password) return null;
          
          const start = Date.now();
          const user = await adapter.getUserByEmail(email as string);
          console.log(`[Authorize] DB lookup took: ${Date.now() - start}ms`);
          
          if (!user) return null;
          const matchingAccount = user.accounts.find(
            (account) => account.provider === 'credentials'
          );
          const accountPassword = matchingAccount?.password;
          if (!accountPassword) return null;
          const isValid = await verify(accountPassword, password as string);
          return isValid ? user : null;
        } catch (err) {
          console.error('[Authorize] Signin error:', err);
          return null;
        }
      },
    }),
    Credentials({
      id: 'credentials-signup',
      name: 'Credentials Sign up',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
      },
      authorize: async (credentials) => {
        try {
          console.log(`[Authorize] Signup attempt for: ${credentials.email}`);
          const { email, password, name } = credentials;
          if (!email || !password) return null;
          
          const start = Date.now();
          const user = await adapter.getUserByEmail(email as string);
          console.log(`[Authorize] DB lookup took: ${Date.now() - start}ms`);
          
          if (!user) {
            console.log(`[Authorize] Creating new user: ${email}`);
            const newUser = await adapter.createUser({
              emailVerified: null,
              email: email as string,
              name: typeof name === 'string' ? name : undefined,
            });
            console.log(`[Authorize] Creating account for user: ${newUser.id}`);
            await adapter.linkAccount({
              extraData: {
                password: await hash(password as string),
              },
              type: 'credentials',
              userId: newUser.id,
              providerAccountId: newUser.id,
              provider: 'credentials',
            });
            return newUser;
          }
          return null;
        } catch (err) {
          console.error('[Authorize] Signup error:', err);
          return null;
        }
      },
    }),
  ],
}));

app.use('/api/auth/*', authConfig);
app.all('/api/auth/*', async (c, next) => {
  console.log(`[Auth] Path: ${c.req.path}, Method: ${c.req.method}`);
  return authHandler()(c, next);
});
app.route(API_BASENAME, api);

export default await createHonoServer({
  app,
  defaultLogger: false,
  invokeMode: 'default',
});
