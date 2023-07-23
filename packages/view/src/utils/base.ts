/* eslint-disable no-console */
export function getQuery(key: string) {
  return new URLSearchParams(location.href.split('?')[1] || '').get(key)
}

// config injected from mizar-cli
export function getConfig() {
  return window.MIZAR_SDK
}

export function getGlobal(key: string) {
  return getConfig()[key]
}

export function getHook(key: string) {
  return getConfig().hooks?.[key]
}

export function runHook(key: string, param: any) {
  return getHook(key)?.(param)
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
