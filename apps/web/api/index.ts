import { handle } from '@hono/node-server/vercel'
import { app } from '../__create/index.js'

export default handle(app)
