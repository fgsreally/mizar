export function getQuery(key: string) {
  return new URLSearchParams(location.href.split('?')[1] || '').get(key)
}
// state injected from puppeteer
export function getPuppeteerState(): any {
  return window.MIZAR_PUPPETEER_STATE
}
// config injected from monitor
export function getIntervalConfig() {
  return window.MIZAR_SDK
}

export function parseType(type: string) {
  switch (type) {
    case 'error':
      return '报错'
    case '':
      return 'go'
  }
}
