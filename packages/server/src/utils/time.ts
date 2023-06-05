export const formatDate = (timestamp: number = Date.now(), format = 'Y-M-D h:m:s'): string => {
  const date = new Date(timestamp)
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
