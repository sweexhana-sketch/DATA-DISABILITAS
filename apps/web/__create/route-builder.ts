import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch.js';

const API_BASENAME = '/api';
const api = new Hono();

// Get current directory
const __dirname = join(fileURLToPath(new URL('.', import.meta.url)), '../src/app/api');
if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}


// Helper function to transform file path to Hono route path
function getHonoPath(routeFile: string): { name: string; pattern: string }[] {
  const relativePath = routeFile.replace(__dirname, '');
  const parts = relativePath.split('/').filter(Boolean);
  const routeParts = parts.slice(0, -1); // Remove 'route.js'
  if (routeParts.length === 0) {
    return [{ name: 'root', pattern: '' }];
  }
  const transformedParts = routeParts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [_, dots, param] = match;
      return dots === '...'
        ? { name: param, pattern: `:${param}{.+}` }
        : { name: param, pattern: `:${param}` };
    }
    return { name: segment, pattern: segment };
  });
  return transformedParts;
}

// Import all routes using Vite's glob import
// This ensures they are bundled and aliases are resolved at build time
// @ts-ignore
const routeModules = import.meta.glob('../src/app/api/**/route.{js,ts}', {
  eager: true,
});

// Import and register all routes
async function registerRoutes() {
  // Clear existing routes
  api.routes = [];

  const sortedFiles = Object.keys(routeModules).sort((a, b) => b.length - a.length);

  for (const file of sortedFiles) {
    try {
      const route = routeModules[file] as any;
      const absolutePath = join(__dirname, file.replace('../src/app/api', ''));
      
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      for (const method of methods) {
        if (route[method]) {
          // Calculate path relative to the api directory
          const parts = getHonoPath(join(__dirname, file.replace('../src/app/api', '')));
          const honoPath = `/${parts.map(({ pattern }) => pattern).join('/')}`;
          
          const handler: Handler = async (c) => {
            const params = c.req.param();
            // In dev, we might want to re-import, but for now we use the bundled version
            return await route[method](c.req.raw, { params });
          };

          const methodLowercase = method.toLowerCase();
          if ((api as any)[methodLowercase]) {
            (api as any)[methodLowercase](honoPath, handler);
          }
        }
      }
    } catch (error) {
      console.error(`Error registering route ${file}:`, error);
    }
  }
}

// Initial route registration
await registerRoutes();

// Hot reload routes in development
// @ts-ignore
if (typeof import.meta !== 'undefined' && import.meta.hot) {
  // @ts-ignore
  import.meta.hot.accept((newSelf) => {
    // With eager glob, we might need a different reload strategy, 
    // but this is mostly for production fix now.
    console.log('HMR for routes triggered');
  });
}

export { api, API_BASENAME };
