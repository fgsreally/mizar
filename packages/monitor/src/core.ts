import type { MonitorCtx, Plugin } from './types'
import { Reporter } from './report'
import {
  formatDate,
  generateUUID,
} from './utils'
export function monitor({ plugins, url, project }: { plugins: Plugin[]; url: string; project: string }) {
  const reporter = new Reporter(project, url)

  // @ts-expect-error globalThis types error
  const global = globalThis.MIZAR_SDK = {
    hooks: {

    },
  } as any
  const context = {
    report: (arg: any) => reporter.report(arg),
    generateUUID,
    formatDate,
    setGlobal: (key, cb) => { global[key] = cb },
    log: (msg, type) => {
      // eslint-disable-next-line no-console
      console.log(`[mizar-monitor] ${type} :${msg}`)
    },
  } as MonitorCtx

  for (const plugin of plugins)
    plugin(context)
}
