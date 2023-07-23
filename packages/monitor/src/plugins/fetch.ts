import type { R } from '../../../server/src/types/query'
import { HttpTypes, MethodTypes } from '../constant'
import type { HttpCollectDataType, Plugin, TransformData, voidFun } from '../types'
import { getUrlPath, replaceOld } from '../utils'
export function fetch(reportResponds = false, ignoreUrls: string[] = []): Plugin {
  return ({ uploadUrl, report }) => {
    const ignore = [...ignoreUrls, uploadUrl].map(url => getUrlPath(url))

    function tranform(collectedData: HttpCollectDataType) {
      // 添加用户行为栈
      const {
        request: { data: params, url, method },
        elapsedTime,
        response: { status },
      } = collectedData

      return {
        type: HttpTypes.FETCH,
        level: String(status).startsWith('2') ? 'info' : 'error',
        message: `${method} "${url}" with "${JSON.stringify(params)}" took ${elapsedTime! / 1000} seconds`,
        data: { method, url, params, elapsedTime, status },
      } as unknown as TransformData<R.Request>
    }
    replaceOld(window, HttpTypes.FETCH, (originalFetch: voidFun) => {
      return function (url: string, config: Partial<Request> = {}): void {
        const sTime = Date.now()
        const method = (config && (config.method as MethodTypes)) || MethodTypes.GET
        const httpCollect: HttpCollectDataType = {
          request: {
            url,
            method,
            data: (config && config.body) as any,
          },
          time: sTime,
          response: {},
        }
        const headers = new Headers(config.headers || {})
        Object.assign(headers, {
          setRequestHeader: headers.set,
        })
        config = {
          ...config,
          headers,
        }
        const isBlock = ignore.includes(getUrlPath(url))
        return originalFetch.apply(window, [url, config]).then(
          (res: Response) => {
            const resClone = res.clone()
            const eTime = Date.now()
            httpCollect.elapsedTime = eTime - sTime
            httpCollect.response.status = resClone.status
            resClone.text().then((data) => {
              if (isBlock)
                return
              if (reportResponds)
                httpCollect.response.data = data

              report(tranform(httpCollect))
            })
            return res
          },
          (err: Error) => {
            if (isBlock)
              return
            const eTime = Date.now()
            httpCollect.elapsedTime = eTime - sTime
            httpCollect.response.status = 0
            report(tranform(httpCollect))
            throw err
          },
        )
      }
    })
  }
}
