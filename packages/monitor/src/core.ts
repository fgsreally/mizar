import { Breadcrumb } from './breadcrumb'
import type { MonitorCtx, Plugin } from './types'
import { Reporter } from './report'
import {
  formatDate,
  generateUUID,
} from './utils'
import { MIZAR_SYMBOL } from './constant'
export function monitor({ plugins, maxBreadcrumbs, url, project }: { plugins: Plugin[]; maxBreadcrumbs?: number; url: string; project: string }) {
  const reporter = new Reporter(project, url)
  const global = globalThis[MIZAR_SYMBOL] = {}
  const context = {
    breadcrumb: new Breadcrumb(maxBreadcrumbs),
    report: (arg: any) => reporter.report(arg),
    generateUUID,
    formatDate,
    setGlobal: (key, cb) => { global[key] = cb },
    // eslint-disable-next-line no-console
    log: (msg, type) => console.log(`[mizar-monitor] ${type} :${msg}`),
  } as MonitorCtx

  for (const plugin of plugins)
    plugin(context)
}
