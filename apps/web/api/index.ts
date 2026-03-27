import { handle } from '@hono/node-server/vercel'
// @ts-ignore
import { app } from '../build/server/index.js'
import { PassThrough } from 'stream'

const honoHandler = handle(app);

export default async function (req: any, res: any) {
  if (req.method === 'POST' && req.body) {
    let rawBody = '';
    if (typeof req.body === 'object') {
       const u = new URLSearchParams();
       for (const [k, v] of Object.entries(req.body)) u.append(k, v as string);
       rawBody = u.toString();
    } else {
       rawBody = String(req.body);
    }
    
    const mockReq = new PassThrough();
    mockReq.end(rawBody);
    
    // Copy essential IncomingMessage properties
    mockReq.headers = req.headers;
    mockReq.method = req.method;
    mockReq.url = req.url;
    mockReq.socket = req.socket;
    mockReq.connection = req.connection;
    Object.assign(mockReq, req);
    
    return honoHandler(mockReq as any, res);
  }
  
  return honoHandler(req, res);
}

