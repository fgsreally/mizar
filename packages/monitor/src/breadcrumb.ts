import type { BreadcrumbPushData } from './types'
import { BreadcrumbLevel } from './types'
/**
 * 用户行为栈存储类
 * @export
 * @class Breadcrumb
 * @template O
 */
export class Breadcrumb {
  private stack: BreadcrumbPushData[] = []
  constructor(private readonly maxBreadcrumbs = 5) {
  }

  /**
   * 添加用户行为栈
   *
   * @param {BreadcrumbPushData} data
   */
  unshift(data: BreadcrumbPushData): BreadcrumbPushData[] {
    if (!data.time)
      data.time = new Date().getTime()

    if (!data.level)
      data.level = BreadcrumbLevel.INFO

    if (this.stack.length >= this.maxBreadcrumbs)
      this.pop()

    this.stack.unshift(data)
    // make sure xhr fetch is behind button click
    this.stack.sort((a, b) => b.time! - a.time!)
    return this.stack
  }

  private pop(): boolean {
    return this.stack.pop() !== undefined
  }

  clear(): void {
    this.stack = []
  }

  getStack(): BreadcrumbPushData[] {
    return this.stack.slice(0)
  }
}
