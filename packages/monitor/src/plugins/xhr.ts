import type { R } from '../../../server/src/types/query'
import type { Plugin, TransformData, voidFun } from '../types'
import { getUrlPath, replaceOld } from '../utils'

export function xhr(reportResponds = false, ignoreUrls: string[] = []): Plugin {
  return ({ report, uploadUrl }) => {
    const ignore = [...ignoreUrls, uploadUrl].map(url => getUrlPath(url))

    function transform(collectedData: any) {
      // 添加用户行为栈
      const {
        request: { method, url, data: params },
        elapsedTime = 0,
        response: { status },
      } = collectedData

      return {
        message: `${method} "${url}" with "${JSON.stringify(params)}" took ${elapsedTime / 1000} seconds`,
        level: String(status).startsWith('2') ? 'info' : 'error',

        type: 'xhr',
        data: {
          status, method, url, params, elapsedTime,
        },
      } as unknown as TransformData<R.Request>
    }
    const originalXhrProto = XMLHttpRequest.prototype
    replaceOld(originalXhrProto, 'open', (originalOpen: voidFun): voidFun => {
      return function (this: any, ...args: any[]): void {
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
      return function (this: any, ...args: any[]): void {
        const { request } = this.httpCollect
        const { url } = request
        this.addEventListener('loadend', function (this: any) {
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
