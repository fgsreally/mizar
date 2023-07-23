/**
 * 格式化日期时间
 * @param {string} format
 * @param {number} timestamp - 时间戳
 * @return {string}
 */
export const formatDate = (format = 'Y-M-D h:m:s', timestamp: number = Date.now()): string => {
  const date = new Date(timestamp || Date.now())
  const dateInfo = {
    Y: `${date.getFullYear()}`,
    M: `${date.getMonth() + 1}`,
    D: `${date.getDate()}`,
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  }
  const formatNumber = (n: number) => (n > 10 ? n : `0${n}`) as string
  const res = (format || 'Y-M-D h:m:s')
    .replace('Y', dateInfo.Y)
    .replace('M', dateInfo.M)
    .replace('D', dateInfo.D)
    .replace('h', formatNumber(dateInfo.h))
    .replace('m', formatNumber(dateInfo.m))
    .replace('s', formatNumber(dateInfo.s))
  return res
}

/**
 * 函数节流
 *
 * @export
 * @param {Function} fn 需要节流的函数
 * @param {number} delay 节流的时间间隔
 * @return {*}  {Function} 返回一个包含节流功能的函数
 */
export function throttle(fn: Function, delay: number): Function {
  let canRun = true
  return function (...args: any) {
    if (!canRun)
      return
    fn(...args)
    canRun = false
    setTimeout(() => {
      canRun = true
    }, delay)
  }
}

/**
 * 生成UUID
 * @return {string}  {string}
 */
export function generateUUID(): string {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

/**
 * 获取url路径地址
 * @param {string} url - 域名地址
 * @return {string}
 */
export const getUrlPath = (url: string): string => {
  const path = `${(url || '').replace(/^http(s|):/, '').split('?')[0]}`
  const endIndex = path.length - 1
  return path[endIndex] === '/' ? path.substring(0, endIndex) : path
}
/**
 * 重写对象上面的某个属性
 *
 * @export
 * @param {any} source 需要被重写的对象
 * @param {string} name 需要被重写对象的key
 * @param {(...args: any[]) => any} replacement 以原有的函数作为参数，执行并重写原有函数
 * @param {boolean} isForced 是否强制重写（可能原先没有该属性）
 */
export function replaceOld(source: any, name: string, replacement: (...args: any[]) => any, isForced?: boolean): void {
  if (source === undefined)
    return
  if (name in source || isForced) {
    const original = source[name]
    const wrapped = replacement(original)
    if (typeof wrapped === 'function')
      source[name] = wrapped
  }
}

/**
 * 获取对象属性值
 * @param {string} keyPath 属性路径
 * @param obj 目标对象
 */
export function getDeepPropByDot(keyPath: string, obj: Object): any {
  if (!keyPath || !obj)
    return null

  const copyTarget = { ...obj }
  const paths = keyPath.split('.')
  let result = copyTarget as any
  for (const key of paths) {
    const value = result[key]
    if (!value) {
      console.warn('TAG', `${key} does not exist`)
      return null
    }
    result = value
  }
  return result
}

export function isSupportSendBeacon() {
  return !!window.navigator?.sendBeacon
}

export function formatDecimal(num: number, decimal: number): number {
  if (!num)
    return num

  let str = num.toString()
  const index = str.indexOf('.')
  if (index !== -1)
    str = str.substring(0, decimal + index + 1)

  else
    str = str.substring(0)

  return parseFloat(str)
}

// 计算DOM元素的XPath
export function getXPath(element: HTMLElement) {
  let xpath = ''
  let index, siblings

  // 如果元素是文本节点，则返回父元素的XPath，并添加索引值
  if (element.nodeType === Node.TEXT_NODE) {
    index = 1
    siblings = element.parentNode!.childNodes
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] === element) {
        xpath += `/text()[${index}]`
        break
      }
      if (siblings[i].nodeType === Node.TEXT_NODE)
        index++
    }
    element = element.parentNode as any
  }

  // 逐级向上遍历元素的父元素，直到文档的根元素
  while (element.parentNode) {
    // 获取元素在其兄弟元素中的索引值
    index = 1
    siblings = element.parentNode!.childNodes
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] === element) {
        xpath = `/${element.tagName.toLowerCase()}[${index}]${xpath}`
        break
      }

      if (siblings[i].nodeType === element.nodeType && (siblings[i] as any).tagName === element.tagName)
        index++
    }
    element = element.parentNode as any
  }

  return xpath
}
