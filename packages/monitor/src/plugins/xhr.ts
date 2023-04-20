import { HttpTypes } from '../constant'
import type { HttpCollectDataType, IAnyObject, Plugin, voidFun } from '../types'
import { BreadcrumbLevel, BrowserBreadcrumbTypes, EventTypes } from '../types'
import { formatDate, generateUUID, getUrlPath, replaceOld } from '../utils'

interface XMLHttp extends IAnyObject {
  httpCollect: HttpCollectDataType
}
export function xhr(reportResponds = false, ignoreUrls: string[] = []): Plugin {
  return ({ report, breadcrumb, uploadUrl }) => {
    const ignore = [...ignoreUrls, uploadUrl].map(url => getUrlPath(url))

    function transform(collectedData: any) {
      const id = generateUUID()
      // 添加用户行为栈
      const {
        request: { method, url, data: params },
        elapsedTime = 0,
        response: { status },
      } = collectedData
      breadcrumb.unshift({
        eventId: id,
        type: BrowserBreadcrumbTypes.XHR,
        level: status !== 200 ? BreadcrumbLevel.WARN : BreadcrumbLevel.INFO,
        message: `${method} "${url}" width "${JSON.stringify(params)}" took ${elapsedTime / 1000} seconds`,
      })
      return {
        id,
        time: formatDate(),
        type: EventTypes.API,
        data: {
          sub_type: HttpTypes.XHR,
          ...collectedData,
        },
      }
    }
    const originalXhrProto = XMLHttpRequest.prototype
    replaceOld(originalXhrProto, 'open', (originalOpen: voidFun): voidFun => {
      return function (this: XMLHttp, ...args: any[]): void {
        this.httpCollect = {
          request: {
            method: args[0] ? args[0].toUpperCase() : args[0],
            url: args[1],
          },
          response: {},
          time: Date.now(),
        }
        originalOpen.apply(this, args)
      }
    })
    replaceOld(originalXhrProto, 'send', (originalSend: voidFun): voidFun => {
      return function (this: IAnyObject, ...args: any[]): void {
        const { request } = this.httpCollect
        const { url } = request
        this.addEventListener('loadend', function (this: XMLHttp) {
          const isBlock = ignore.includes(getUrlPath(url))
          if (isBlock)
            return
          const { responseType, response, status } = this
          request.data = args[0]
          const eTime = Date.now()
          if (reportResponds && ['', 'json', 'text'].includes(responseType))
            this.httpCollect.response.data = typeof response === 'object' ? JSON.stringify(response) : response

          this.httpCollect.response.status = status
          this.httpCollect.elapsedTime = eTime - this.httpCollect.time
          report(transform(this.httpCollect))
        })
        originalSend.apply(this, args)
      }
    })
  }
}
