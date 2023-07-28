/* eslint-disable no-console */
export function getQuery(key: string) {
  return new URLSearchParams(location.href.split('?')[1] || '').get(key)
}

// config injected from mizar-cli(puppeteer)
export function getPuppeteerState(key?: string) {
  return key ? window.MIZAR_PUPPETEER_STATE?.[key] : window.MIZAR_PUPPETEER_STATE
}

// config injected from mizar-monitor
export function getMonitorState(key?: string) {
  return key ? window.MIZAR_SDK?.[key] : window.MIZAR_SDK
}

export function getGlobal(key: string) {
  return getQuery(key) || getPuppeteerState(key) || getMonitorState(key)
}

export function runHook(key: string, param: any) {
  return (getPuppeteerState('hooks') || getMonitorState('hooks'))?.[key]?.(param)
}

export function log(msg: any) {
  console.log('--MIZAR OUTPUT--')

  console.log(msg)

  console.log('--END--')
}

// export function parseType(type: string) {
//   switch (type) {
//     case 'error':
//       return '报错'
//     case '':
//       return 'go'
//   }
// }
