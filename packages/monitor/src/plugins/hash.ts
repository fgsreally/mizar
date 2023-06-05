import { RouteTypes } from '../constant'
import type { Plugin, ReportDataType } from '../types'
import { EventTypes } from '../types'
import { formatDate, generateUUID } from '../utils'
import type { RouteDataMsgType, RouteMsgType } from './history'

export function hash(): Plugin {
  return ({ report }) => {
    function transform(collectedData: RouteDataMsgType): ReportDataType<RouteMsgType> {
      const id = generateUUID()
      // 添加用户行为栈
      // const { from, to } = collectedData
      // breadcrumb.unshift({
      //   eventId: id,
      //   type: BrowserBreadcrumbTypes.ROUTE,
      //   message: `from "${from}" to "${to}" by hash`,
      // })
      return {
        id,
        time: formatDate(),
        type: EventTypes.ROUTE,
        data: {
          sub_type: RouteTypes.HASH,
          ...collectedData,
        },
      }
    }
    window.addEventListener('hashchange', (e: HashChangeEvent) => {
      const { oldURL: from, newURL: to } = e
      if (from === to)
        return
      report(transform({ from, to }))
    })
  }
}
