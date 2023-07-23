import { RouteTypes } from '../constant'
import type { Plugin } from '../types'

export function hash(): Plugin {
  return ({ report }) => {
    window.addEventListener('hashchange', (e: HashChangeEvent) => {
      const { oldURL: from, newURL: to } = e
      if (from === to)
        return
      report({
        level: 'log',
        type: RouteTypes.HASH,
        data: {
          from, to,
        },
      })
    })
  }
}
