import { record } from 'rrweb'
import type { Plugin, RecordDataType } from '../types'
import { EventTypes, RecordTypes } from '../types'

export function rrweb(): Plugin {
  return ({ report, formatDate, generateUUID }) => {
    let stopFnc: ReturnType<typeof record>
    const events: any[] = []
    window.addEventListener('load', () => {
      stopFnc = record({
        emit(event) {
          events.push(event)
        },
      })
    })
    function transform(collectedData: RecordDataType) {
      return {
        id: generateUUID(),
        time: formatDate(),
        type: EventTypes.RECORD,
        data: {
          sub_type: RecordTypes.SESSION,
          ...collectedData,
        },
      }
    }
    window.addEventListener('unload', () => {
      if (!stopFnc)
        return

      stopFnc()
      report(transform({
        events,
      }))
    })
  }
}
