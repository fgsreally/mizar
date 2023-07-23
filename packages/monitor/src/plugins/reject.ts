import type { Plugin } from '../types'

export interface PromiseErrorDataType {
  message?: string
}

export function reject(): Plugin {
  return ({ report, log }) => {
    window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
      e.preventDefault()
      const {
        reason,
      } = e
      let message = ''
      if (typeof reason === 'string')
        message = reason
      else if (typeof reason === 'object' && reason.stack)
        message = reason.message
      log(message, 'reject')
      report({

        type: 'reject',
        level: 'error',
        message,
        data: { stack: reason.stack },

      })
    })
  }
}
