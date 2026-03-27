import { handle } from '@hono/node-server/vercel'
// @ts-ignore
import { app } from '../build/server/index.js'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handle(app)
