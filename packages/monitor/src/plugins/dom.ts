import { DomTypes } from '../constant'
import type { Plugin } from '../types'
import { BrowserBreadcrumbTypes, EventTypes } from '../types'
import { getXPath, throttle } from '../utils'
/**
 * 返回包含id、class、innerTextde字符串的标签
 * @param target html节点
 */
export function htmlElementAsString(target: HTMLElement): string | null {
  if (!target)
    return null

  const tagName = target.tagName.toLowerCase()
  if (tagName === 'body')
    return null

  let classNames = target.classList.value
  classNames = classNames !== '' ? ` class="${classNames}"` : ''
  const id = target.id ? ` id="${target.id}"` : ''
  const innerText = target.innerText
  return `<${tagName}${id}${classNames !== '' ? classNames : ''}>${innerText}</${tagName}>`
}
export function dom(throttleDelayTime = 300): Plugin {
  return ({ formatDate, generateUUID, report, breadcrumb }) => {
    const clickThrottle = throttle((activeElement: HTMLElement) => {
      const category = DomTypes.CLICK
      const htmlString = htmlElementAsString(activeElement)
      if (!htmlString)
        return null

      // 添加用户行为栈
      const id = generateUUID()
      breadcrumb.unshift({
        eventId: id,
        type: BrowserBreadcrumbTypes.CLICK,
        message: `Click ${htmlString}`,
      })
      report({
        id,
        xpath: getXPath(activeElement),
        time: formatDate(),
        type: EventTypes.DOM,
        data: {
          sub_type: category,
          ele: htmlString,
        },
      })
    }, throttleDelayTime)
    document.addEventListener(
      'click',
      function () {
        clickThrottle(this.activeElement)
      },
      true,
    )
  }
}
