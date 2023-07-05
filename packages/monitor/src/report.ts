import { PlatformTypes } from './constant'
import type { ClientInfoType, IAnyObject } from './types'
import { isSupportSendBeacon } from './utils'

export class Reporter {
  protected fetch = isSupportSendBeacon() ? window.navigator.sendBeacon.bind(window.navigator) : reportWithXHR
  protected tasks = [] as any[]
  protected user_agent = navigator.userAgent
  protected requestIdleCallback = window.requestIdleCallback ? window.requestIdleCallback.bind(window) : setTimeout
  constructor(protected readonly project: string, protected readonly url: string) {

  }

  init() {
    const send = () => {
      if (this.tasks.length > 0) {
        this.fetch(this.url, {
          tasks: this.tasks,
          project: this.project, // 会话id
          platform: PlatformTypes.BROWSER,
          user_agent: this.user_agent, // 浏览器标识
        })
        this.tasks = []
      }
    }
    window.addEventListener('beforeunload', send)
    window.addEventListener('pagehide', send)
  }

  transform(datas: IAnyObject): IAnyObject & ClientInfoType {
    const { language } = navigator
    const { title } = document
    const { href } = location
    return {

      page_title: title, // 页面标题
      path: href, // 页面路径
      language, // 站点语言

      ...datas,
    }
  }

  report(task: any) {
    if (task)
      return
    this.tasks.push(this.transform(task))
    if (this.tasks.length > 10) {
      this.requestIdleCallback(() => this.fetch(this.url, this.tasks))
      this.tasks = []
    }
  }
}

function reportWithXHR(url: string, data: any) {
  const originalProto = XMLHttpRequest.prototype
  const xhr = new XMLHttpRequest()
  originalProto.open.call(xhr, 'post', url)
  originalProto.send.call(xhr, JSON.stringify(data))
}
