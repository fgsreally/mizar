import type { Plugin, ReportDataType, VueReportDataType } from '../types'
import { BreadcrumbLevel, BrowserBreadcrumbTypes, EventTypes } from '../types'
enum VueTypes {
  ERROR = 'error',
}

export function vue(): Plugin {
  return ({ report, breadcrumb, setGlobal, formatDate, generateUUID }) => {
    function transform(data: VueReportDataType): ReportDataType<VueReportDataType> {
      const id = generateUUID()
      // 添加用户行为栈
      const { hook, stack } = data
      breadcrumb.unshift({
        eventId: id,
        type: BrowserBreadcrumbTypes.FRAMEWORK,
        level: BreadcrumbLevel.FATAL,
        message: `Error in Vue/${hook}: "${stack && stack.toString()}"`,
      })

      breadcrumb.clear()
      return {
        id,
        time: formatDate(),
        type: EventTypes.VUE,
        breadcrumb: breadcrumb.getStack(),
        data,
      }
    }
    setGlobal('vue', (app: any) => {
      const { errorHandler } = app.config
      app.config.errorHandler = (error: any, vm: any, lifecycleHook: string) => {
        const { name, message, stack = '' } = error
        report(transform({
          name,
          message,
          hook: lifecycleHook,
          stack,
          sub_type: VueTypes.ERROR,
          ...parseStack(stack),
        }))
        if (typeof errorHandler === 'function')
          errorHandler.call(app, error, vm, lifecycleHook)
      }
    })
  }
}

function parseStack(stack: string) {
  const REG_EXP = /([a-z|0-9|-]*).js:[0-9]*:[0-9]*/
  const [, sourceFile] = stack.split('\n')
  const [matched = ''] = REG_EXP.exec(sourceFile) || []
  const [fileName, lineCol = ''] = matched.split('.js:')
  const [line, col] = lineCol.split(':')
  const lineno = Number(line)
  const colno = Number(col)
  if (!fileName)
    return {}

  return {
    lineno,
    colno,
    filename: `${fileName}.js`,
  }
}
