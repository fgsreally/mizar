import { Breadcrumb } from './breadcrumb'
import type { MonitorCtx, Plugin } from './types'

export function monitor({ plugins, maxBreadcrumbs }: { plugins: Plugin[]; maxBreadcrumbs?: number }) {
  const context = {
    breadcrumb: new Breadcrumb(maxBreadcrumbs),
    // eslint-disable-next-line no-console
    log: (msg, type) => console.log(`[mizar-monitor] ${type} :${msg}`),
  } as MonitorCtx

  for (const plugin of plugins)
    plugin(context)
}
