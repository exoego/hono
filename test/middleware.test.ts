import makeServiceWorkerEnv from 'service-worker-mock'
import { Hono, Middleware } from '../src/hono'

declare var global: any
Object.assign(global, makeServiceWorkerEnv())

describe('Builtin Middleware', () => {
  const app = new Hono()

  app.use('*', Middleware.poweredBy())
  app.get('/', () => new Response('root'))

  it('Builtin Powered By Middleware', async () => {
    let req = new Request('/')
    let res = await app.dispatch(req)
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
    expect(res.headers.get('X-Powered-By')).toBe('Hono')
  })
})