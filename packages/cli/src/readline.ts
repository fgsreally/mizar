import readline from 'readline'
import { log } from './utils'
// 函数定义，接收一个回调函数作为参数
export function useReadLine() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  // 监听输入
  rl.on('line', (input) => {
    // 当输入为 'q' 时，关闭 readline 接口并调用回调函数
    if (input.trim().toLowerCase() === 'q') {
      rl.close()
      log('process exit')
      process.exit(0)
    }
  })

  // 监听关闭事件
  rl.on('close', () => {
    process.exit(0)
  })
}
