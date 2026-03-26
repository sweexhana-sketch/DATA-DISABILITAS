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
  pages: {
    signIn: '/account/signin',
    signOut: '/account/logout',
    error: '/account/error',
  },
  basePath: '/api/auth',
  skipCSRFCheck: true, // Ensuring CSRF is handled more gracefully in serverless
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
        const { email, password } = credentials;
        if (!email || !password) return null;
        const user = await adapter.getUserByEmail(email as string);
        if (!user) return null;
        const matchingAccount = user.accounts.find(
          (account) => account.provider === 'credentials'
        );
        const accountPassword = matchingAccount?.password;
        if (!accountPassword) return null;
        const isValid = await verify(accountPassword, password as string);
        return isValid ? user : null;
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
        const { email, password, name } = credentials;
        if (!email || !password) return null;
        const user = await adapter.getUserByEmail(email as string);
        if (!user) {
          const newUser = await adapter.createUser({
            emailVerified: null,
            email: email as string,
            name: typeof name === 'string' ? name : undefined,
          });
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
      },
    }),
  ],
}));

app.use('/api/auth/*', authConfig);
app.use('/api/auth/*', authHandler());
app.all('/integrations/:path{.+}', async (c, next) => {
  const queryParams = c.req.query();
  const url = `${process.env.NEXT_PUBLIC_CREATE_BASE_URL ?? 'https://www.create.xyz'}/integrations/${c.req.param('path')}${Object.keys(queryParams).length > 0 ? `?${new URLSearchParams(queryParams).toString()}` : ''}`;

  return proxy(url, {
    method: c.req.method,
    body: c.req.raw.body ?? null,
    // @ts-ignore - this key is accepted even if types not aware and is
    // required for streaming integrations
    duplex: 'half',
    redirect: 'manual',
    headers: {
      ...c.req.header(),
      'X-Forwarded-For': process.env.NEXT_PUBLIC_CREATE_HOST,
      'x-createxyz-host': process.env.NEXT_PUBLIC_CREATE_HOST,
      Host: process.env.NEXT_PUBLIC_CREATE_HOST,
      'x-createxyz-project-group-id': process.env.NEXT_PUBLIC_PROJECT_GROUP_ID,
    },
  });
});

app.route(API_BASENAME, api);

export default await createHonoServer({
  app,
  defaultLogger: false,
  invokeMode: 'default',
});
