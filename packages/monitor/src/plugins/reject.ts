import { BrowserErrorTypes, ConsoleTypes } from '../constant'
import type { Plugin, ReportDataMsgType, ReportDataType } from '../types'
import { BreadcrumbLevel, BrowserBreadcrumbTypes, EventTypes } from '../types'
import { formatDate, generateUUID } from '../utils'
interface CollectedType {
  category: EventTypes
  data: PromiseRejectionEvent
}

export interface PromiseErrorDataType {
  message?: string
}
export interface PromiseErrorType extends ReportDataMsgType, PromiseErrorDataType {}

export function reject(): Plugin {
  return ({ breadcrumb, report, log }) => {
    function transform(collectedData: CollectedType): ReportDataType<PromiseErrorType> {
      const {
        category,
        data: { reason },
      } = collectedData
      let message = ''
      if (typeof reason === 'string')
        message = reason

      else if (typeof reason === 'object' && reason.stack)
        message = reason.stack

      const id = generateUUID()
      breadcrumb.unshift({
        eventId: id,
        type: BrowserBreadcrumbTypes.UNHANDLEDREJECTION,
        level: BreadcrumbLevel.ERROR,
        message,
      })
      return {
        id,
        time: formatDate(),
        type: category,
        breadcrumb: breadcrumb.getStack(),
        data: {
          sub_type: BrowserErrorTypes.UNHANDLEDREJECTION,
          message,
        },
      }
    }
    window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
      e.preventDefault()
      console.log(e)
      log(e, ConsoleTypes.ERROR)
      report(transform({
        category: EventTypes.ERROR,
        data: e,
      }))
    })
  }
}
