import { createServer } from 'net'
import type { ChildProcessWithoutNullStreams } from 'child_process'
import { spawn } from 'child_process'
import fs from 'fs'
import { createInterface } from 'readline'
import { nanoid } from 'nanoid'
import portfinder from 'portfinder'

const pipeFile
  = process.platform === 'win32' ? '\\\\.\\pipe\\mypip' : '/tmp/unix.sock'
const portMap = new Map<string, { port: string; debugPort: string }>()
const processMap = new Map<string, ChildProcessWithoutNullStreams>()

const { env: { max, entry, duration } } = process

function findPort() {
  return portfinder.getPortPromise()
}
const ipc = createServer((connection) => {
  connection.on('error', err => console.error(err.message))

  connection.on('data', async (data) => {
    const id = data.toString()
    // console.log('id', id)
    if (id !== 'false') {
      connection.write(JSON.stringify(portMap.get(id)))
      return
    }
    if (processMap.size > Number(max)) {
      connection.write('false')
      return
    }

    const uuid = nanoid()
    const port: string = await findPort() as any
    const child = spawn('node', ['--inspect', entry!], {
      env: {
        port,
        ...process.env,
      },
    })

    const rl = createInterface({
      input: child.stderr,
      output: child.stdin,
      terminal: false,
    })

    // 监听子进程输出，查找 WebSocket 链接
    rl.on('line', (line) => {
      // 检查输出是否包含 WebSocket 链接信息
      if (line.includes('Debugger listening on')) {
        // 提取 WebSocket 链接
        const matches = line.match(/ws:\/\/[^:]+:(\d+)\/(.*)/)
        if (matches && matches.length > 0) {
          portMap.set(uuid, { port, debugPort: matches[1] })
          processMap.set(uuid, child)
          connection.write(JSON.stringify({ id: uuid, path: matches[2] }))

          setTimeout(() => {
            child.kill()
            portMap.delete(uuid)
            processMap.delete(uuid)
          }, Number(duration))
        }
      }
    })
  })
  connection.on('error', err => console.error(err.message))
})

ipc.on('error', () => {
  process.exit(0)
})
try {
  fs.unlinkSync(pipeFile)
}
catch (error) {}

ipc.listen(pipeFile)
