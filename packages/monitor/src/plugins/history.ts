import type { R } from '../../../server/src/types/query'
import { RouteTypes } from '../constant'
import type { Plugin, TransformData, voidFun } from '../types'
import { replaceOld } from '../utils'

function supportsHistory(): boolean {
  return window && !!window.history.pushState && !!window.history.replaceState
}
export function history(): Plugin {
  return ({ report }) => {
    function transform(collectedData: { from: string; to: string }): TransformData<R.Route> {
      // 添加用户行为栈
      const { from, to } = collectedData
      if (from === to)
        return undefined

      return {
        level: 'log',
        message: `from "${from}" to "${to}" by history`,
        type: RouteTypes.HISTORY,
        data: collectedData,
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
