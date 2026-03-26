import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch.js';
import { routesManifest } from './route-manifest.js';

const API_BASENAME = '/api';
const api = new Hono();

if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// Helper function to transform file path to Hono route path
function getHonoPath(relativePath: string): { name: string; pattern: string }[] {
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

// Register all routes from the static manifest
async function registerRoutes() {
  // Clear existing routes
  api.routes = [];

  const sortedManifest = routesManifest.slice().sort((a, b) => {
    return b.path.length - a.path.length;
  });

  for (const item of sortedManifest) {
    try {
      const route = item.module;
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      
      for (const method of methods) {
        try {
          if (route[method as keyof typeof route]) {
            const parts = getHonoPath(item.path);
            const honoPath = `/${parts.map(({ pattern }) => pattern).join('/')}`;
            const handler: Handler = async (c) => {
              const params = c.req.param();
              return await (route as any)[method](c.req.raw, { params });
            };
            const methodLowercase = method.toLowerCase();
            if ((api as any)[methodLowercase]) {
              (api as any)[methodLowercase](honoPath, handler);
            }
          }
        } catch (error) {
          console.error(`Error registering route ${item.path} for method ${method}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error processing route manifest item ${item.path}:`, error);
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
    registerRoutes().catch((err) => {
      console.error('Error reloading routes:', err);
    });
  });
}

export { api, API_BASENAME };
