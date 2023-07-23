import type { Plugin } from '../types'

export function vue(): Plugin {
  return ({ report, setGlobal }) => {
    setGlobal('vue', (app: any) => {
      const { errorHandler } = app.config
      app.config.errorHandler = (error: any, vm: any, lifecycleHook: string) => {
        if (error instanceof Error) {
          report({
            level: 'error',
            type: 'vue',

            message: `Error in Vue/${lifecycleHook}: "${error.message}"`,

            data: {
              stack: error.stack,
            },
          })
        }
        if (typeof error === 'string') {
          report({
            level: 'error',
            type: 'vue',

            message: `Error in Vue/${lifecycleHook}: "${error}"`,

            data: {
            },
          })
        }
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
