import { app } from '../build/server/index.js'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function (req: any, res: any) {
  try {
    // 1. Manually buffer the Node stream. This never hangs.
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const body = Buffer.concat(buffers);
    
    // 2. Construct native Web Request
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`).toString();
    
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) {
      if (Array.isArray(v)) v.forEach(val => headers.append(k, String(val)));
      else if (v) headers.set(k, String(v));
    }
    
    const init = {
      method: req.method,
      headers,
      body: (req.method !== 'GET' && req.method !== 'HEAD') ? body : undefined,
      duplex: 'half' // Required by some Node versions for body fetching
    } as any;
    
    const request = new Request(url, init);
    
    // 3. Call Hono directly! Pass process.env as Hono env bindings so c.env works.
    const response = await app.fetch(request, process.env);
    
    // 4. Map Web Response back to Vercel Response
    // Handle split cookies correctly
    const setCookies = response.headers.getSetCookie ? response.headers.getSetCookie() : [];
    response.headers.forEach((v, k) => {
      if (k.toLowerCase() === 'set-cookie') return; // Handled separately
      res.setHeader(k, v);
    });
    
    if (setCookies && setCookies.length > 0) {
      res.setHeader('set-cookie', setCookies);
    }
    
    res.statusCode = response.status;
    
    if (response.body) {
      if (typeof (response.body as any).getReader === 'function') {
        const reader = (response.body as any).getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
      } else {
        // Fallback for async iterables
        for await (const chunk of response.body as any) {
          res.write(chunk);
        }
      }
    }
    res.end();
  } catch (err: any) {
    console.error('CRITICAL VERCEL GATEWAY ERROR:', err);
    res.statusCode = 500;
    res.end(err?.message || 'Gateway Error');
  }
}

