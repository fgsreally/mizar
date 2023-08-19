import type { ChildProcessWithoutNullStreams } from 'child_process'
import { spawn } from 'child_process'
import { createProxyMiddleware } from 'http-proxy-middleware'
import fp from 'find-port'
import { nanoid } from 'nanoid'

function findPort() {
  return new Promise<string[]>((resolve) => {
    fp('127.0.0.1', 6000, 7000, (ports: string[]) => {
      resolve(ports)
    })
  })
}

export function debugMiddle(entry: string, options: any) {
  const portMap = new Map<string, { port: string; debugPort: string }>()
  const processMap = new Map<string, ChildProcessWithoutNullStreams>()
  const proxyOpts = {
    // changeOrigin: true, // 默认false，是否需要改变原始主机头为目标URL
    ws: true, // 是否代理websockets
    pathRewrite: {
      '^/api/old-path': '/api/new-path', // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
      '^/api/remove/path': '/path', // 同上
    },
    router: (req) => {
      return {
        protocol: req.socket ? 'ws:' : 'http:', // The : is required
        host: '127.0.0.1',
        port: portMap.get(req.debuggerID)![req.socket ? 'debugPort' : 'port'],
      }
    },
    ...options.proxyOpts,
  }
  const proxyMiddle = createProxyMiddleware(proxyOpts)
  return async (req: any, res: any, next: any) => {
    const id = req.params.id
    if (id) {
      req.debuggerID = id
      if (processMap.has(id))
        proxyMiddle(req, res, next)
      else res.status(500).end()
    }
    else {
      if (processMap.size > options.max) {
        res.status(500).end('')
        return
      }
      const uuid = nanoid()
      const [port, debugPort] = await findPort()
      const process = spawn('node', [entry, `--inspect=0.0.0.0:${debugPort}`], {
        env: {
          port,
          ...options.env,
        },
      })
      portMap.set(uuid, { port, debugPort })
      processMap.set(uuid, process)
    }
  }
}
