import { ConsoleTypes } from '../constant'
import type { Plugin, TransformData } from '../types'

import type { R } from '../../../server/src/types/query'

interface ResourceTarget {
  src?: string
  href?: string
  localName?: string
}

export function error(): Plugin {
  return ({ report, log }) => {
    function transform(data: ErrorEvent): TransformData<R.ResourceError | R.RuntimeError> {
      const { localName, src, href } = (data.target as ResourceTarget) || {}

      if (localName) {
        // 资源加载错误

        return {
          message: `fail to load ${localName} from '${src || href}'`,
          type: 'resource',
          level: 'error',
          data: {
            source_type: localName,
            href: src || href!,

          },
        }
      }
      // 代码错误
      const { message, stack } = data.error

      return {

        type: 'category',
        level: 'error',
        message,
        data: {
          stack,
        },
      }
    }
    window.addEventListener(
      'error',
      (e: ErrorEvent) => {
        // e.preventDefault()
        log(e.message, ConsoleTypes.ERROR)
        report(transform(e))
      },
      true,
    )
  }
}
