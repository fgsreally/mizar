import type { MonitorCtx, Plugin } from '../types'

export function micro(): Plugin {
  return (ctx) => {
    ctx.setGlobal('micro', (cb: (ctx: MonitorCtx) => void) => cb(ctx))
  }
}
