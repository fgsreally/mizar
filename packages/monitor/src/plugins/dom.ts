import type { Plugin, TransformData } from '../types'
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
  return ({ report }) => {
    const clickThrottle = throttle((activeElement: HTMLElement) => {
      const htmlString = htmlElementAsString(activeElement)
      if (!htmlString)
        return null

      report({
        // id,
        type: 'dom_click',
        message: `click dom (${htmlString})`,
        data: {
          xpath: getXPath(activeElement),
          htmlString,
        },
      } as TransformData)
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
