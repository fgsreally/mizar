/* eslint-disable prefer-promise-reject-errors */
import { fork } from 'child_process'
import type { Socket } from 'net'
import { connect } from 'net'
import { resolve } from 'path'

import HP from 'http-proxy'
const proxy = HP.createProxyServer({})
const RE = /\/debug\/(\w+)\/(.+)/
const pipeFile
  = process.platform === 'win32' ? '\\\\.\\pipe\\mypip' : '/tmp/unix.sock'
const portMap = new Map<string, { port: string; debugPort: string }>()

export function debugApp(app: any, entry: string, options: any) {
  let client: Socket
  fork(resolve(__dirname, 'bridge.js'), {
    env: {
      MIZAR_NODE_DEBUGGER: 'true',
      entry,
    },
  })

  setTimeout(() => {
    client = connect(pipeFile)
  }, 1000)

  function getPortFromBridge(id: string) {
    if (portMap.has(id))
      return portMap.get(id)
    return new Promise<{ port: string; debugPort: string }>((resolve, reject) => {
      client.once('data', (data) => {
        const ret = data.toString()
        if (ret === 'false') {
          reject()
        }
        else {
          portMap.set(id, JSON.parse(ret))
          resolve(portMap.get(id)!)
        }
      })
      client.write(id)
    })
  }

  app.use('/debug*', async (req: any, res: any) => {
    if (process.env.MIZAR_NODE_DEBUGGER)
      return
    const [, id, pathname] = req.originalUrl.match(RE) || []

    if (id) {
      try {
        const ret = await getPortFromBridge(id)

        req.url = `/${pathname}`
        return proxy.web(req, res, {
          target: `${req.protocol}://0.0.0.0:${ret!.port}`,
        })
      }
      catch (e) {
        res.status(404).send('not id')
      }
    }
    else {
      client.once('data', (data) => {
        const ret = data.toString()
        if (ret === 'false')
          return res.status(500).end('')

        res.status(400).end(ret)
      })
      client.write('false')
    }
  })
  return async (req: any, socket: any, head: any) => {
    const [, id, pathname] = req.url.match(RE) || []

    const ret = await getPortFromBridge(id)

    req.url = `/${pathname}`

    return proxy.ws(req, socket, head, {
      target: `ws://127.0.0.1:${ret!.debugPort}`,
    })
  }
}
