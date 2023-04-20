import { RouteTypes } from '../constant'
import type { Plugin, ReportDataMsgType, ReportDataType, voidFun } from '../types'
import { BrowserBreadcrumbTypes, EventTypes } from '../types'
import { formatDate, generateUUID, replaceOld } from '../utils'

export interface RouteDataMsgType {
  from: string
  to: string
}

export interface RouteMsgType extends ReportDataMsgType, RouteDataMsgType {}

function supportsHistory(): boolean {
  return window && !!window.history.pushState && !!window.history.replaceState
}
export function history(): Plugin {
  return ({ report, breadcrumb }) => {
    function transform(collectedData: RouteDataMsgType): ReportDataType<RouteMsgType> {
      const id = generateUUID()
      // 添加用户行为栈
      const { from, to } = collectedData
      if (from === to)
        return undefined as unknown as ReportDataType<RouteMsgType>

      breadcrumb.unshift({
        eventId: id,
        type: BrowserBreadcrumbTypes.ROUTE,
        message: `from "${from}" to "${to}" by history`,
      })
      return {
        id,
        time: formatDate(),
        type: EventTypes.ROUTE,
        data: {
          sub_type: RouteTypes.HISTORY,
          ...collectedData,
        },
      }
    }
    let lastHref = ''
    if (!supportsHistory())
      return
    const originOnpopstate = window.onpopstate
    window.onpopstate = function (this: WindowEventHandlers, ...args: any[]) {
      const to = document.location.href
      const from = lastHref
      lastHref = to
      report(transform({
        from,
        to,
      }))
      originOnpopstate && originOnpopstate.apply(this, args)
    }
    function historyReplaceFn(originalHistoryFn: voidFun): voidFun {
      return function (this: History, ...args: any[]): void {
        const url = args.length > 2 ? args[2] : undefined
        if (url) {
          const from = lastHref
          const to = String(url)
          lastHref = to
          report(transform({
            from,
            to,
          }))
        }
        return originalHistoryFn.apply(this, args)
      }
    }
    // 人为调用，不触发onpopstate
    replaceOld(window.history, 'pushState', historyReplaceFn)
    replaceOld(window.history, 'replaceState', historyReplaceFn)
  }
}
