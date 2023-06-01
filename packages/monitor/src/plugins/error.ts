import { BrowserErrorTypes, ConsoleTypes } from '../constant'
import type { CodeErrorType, Plugin, ReportDataMsgType, ReportDataType } from '../types'
import { BreadcrumbLevel, BrowserBreadcrumbTypes, EventTypes } from '../types'
import { formatDate, generateUUID } from '../utils'

interface CollectedType {
  category: EventTypes
  data: Event
}

interface ResourceTarget {
  src?: string
  href?: string
  localName?: string
}
export interface LinkMsgDataType {
  href?: string
}
export interface ResourceErrorType extends ReportDataMsgType, LinkMsgDataType {}

export function error(): Plugin {
  return ({ report, breadcrumb, log }) => {
    function transform(collectedData: CollectedType): ReportDataType<ResourceErrorType | CodeErrorType> {
      const { category, data } = collectedData
      const { localName, src, href } = (data.target as ResourceTarget) || {}
      const id = generateUUID()
      const time = formatDate()
      if (localName) {
        // 资源加载错误
        const resourceData = {
          source_type: localName,
          href: src || href,
        }
        // 上报用户行为栈
        breadcrumb.unshift({
          eventId: id,
          type: BrowserBreadcrumbTypes.RESOURCE,
          level: BreadcrumbLevel.FATAL,
          message: `Unable to load "${resourceData.href}"`,
        })
        return {
          id,
          time,
          type: category,
          lever:'error',
          breadcrumb: breadcrumb.getStack(),
          data: {
            sub_type: BrowserErrorTypes.RESOURCEERROR,
            ...resourceData,
          },
        }
      }
      // 代码错误
      const { message, lineno, colno, filename } = data as ErrorEvent
      // 上报用户行为栈
      breadcrumb.unshift({
        eventId: id,
        type: BrowserBreadcrumbTypes.CODE_ERROR,
        level: BreadcrumbLevel.ERROR,
        message,
      })

      return {
        id,
        time,
        type: category,
        breadcrumb: breadcrumb.getStack(),
        data: {
          sub_type: BrowserErrorTypes.CODEERROR,
          message,
          lineno,
          colno,
          filename,
        },
      }
    }
    window.addEventListener(
      'error',
      (e: Event) => {
        e.preventDefault()
        log(e, ConsoleTypes.ERROR)
        report(transform({
          category: EventTypes.ERROR,
          data: e,
        }))
      },
      true,
    )
  }
}
