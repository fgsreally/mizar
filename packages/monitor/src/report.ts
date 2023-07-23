import { PlatformTypes } from './constant'
import type { TransformData } from './types'
import { formatDate, generateUUID } from './utils'

export class Reporter {// isSupportSendBeacon() ? window.navigator.sendBeacon.bind(window.navigator) :
  protected fetch = reportWithXHR
  protected tasks = [] as any[]
  protected user = generateUUID()
  protected user_agent = navigator.userAgent
  protected requestIdleCallback = window.requestIdleCallback ? window.requestIdleCallback.bind(window) : setTimeout
  constructor(protected readonly project: string, protected readonly url: string) {

  }

  init() {
    const send = this.send.bind(this)
    window.addEventListener('beforeunload', send)
    window.addEventListener('pagehide', send)
  }

  setUser(user: string) {
    this.user = user
  }

  send() {
    if (this.tasks.length > 0) {
      this.fetch(this.url, {
        tasks: this.tasks,
        base: {
          project: this.project, // 会话id
          platform: PlatformTypes.BROWSER,
          user_agent: this.user_agent, // 浏览器标识
        },
      })
      this.tasks = []
    }
  }

  transform(datas: TransformData) {
    const { language } = navigator
    const { title } = document
    const { href } = location

    return {
      uid: generateUUID(),
      time: formatDate(),
      user: this.user,
      page_title: title, // 页面标题
      url: href, // 页面路径
      language, // 站点语言

      ...datas,
    }
  }

  report(task: any) {
    if (!task)
      return
    this.tasks.push(this.transform(task))
    if (this.tasks.length > 10)
      this.requestIdleCallback(() => this.send())
  }
}

function reportWithXHR(url: string, data: any) {
  const originalProto = XMLHttpRequest.prototype
  const xhr = new XMLHttpRequest()
  originalProto.open.call(xhr, 'POST', url)
  originalProto.setRequestHeader.call(xhr, 'Content-Type', 'application/json')
  originalProto.send.call(xhr, JSON.stringify(data))
}
