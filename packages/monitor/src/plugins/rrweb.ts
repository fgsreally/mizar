import { record } from 'rrweb'
import type { Plugin } from '../types'

export function rrweb(): Plugin {
  return ({ report }) => {
    let stopFnc: ReturnType<typeof record>
    const events: any[] = []
    window.addEventListener('load', () => {
      stopFnc = record({
        emit(event) {
          events.push(event)
        },
      })
    })

    window.addEventListener('unload', () => {
      if (!stopFnc)
        return

      stopFnc()
      report({
        level: 'log',
        type: 'record',
        data: events,
      })
    })
  }
}
