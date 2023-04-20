import { isSupportSendBeacon } from './utils'

export class Controller {
  protected fetch = isSupportSendBeacon() ? window.navigator.sendBeacon.bind(window.navigator) : reportWithXHR
  protected tasks = [] as any[]
  protected requestIdleCallback = window.requestIdleCallback ? window.requestIdleCallback.bind(window) : setTimeout
  constructor(protected readonly url: string) {

  }

  add(task: any) {
    this.tasks.push(task)
    if (this.tasks.length > 10) {
      this.report(this.tasks)
      this.tasks = []
    }
  }

  report(tasks: any[]) {
    this.requestIdleCallback(() => this.fetch(this.url, tasks))
  }
}

function reportWithXHR(url: string, data: any) {
  const originalProto = XMLHttpRequest.prototype
  const xhr = new XMLHttpRequest()
  originalProto.open.call(xhr, 'post', url)
  originalProto.send.call(xhr, JSON.stringify(data))
}
