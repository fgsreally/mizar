import { Factory } from 'phecda-server'
import { describe, it } from 'vitest'
import { ReportController } from '../src/modules/report/report.controller'
import { ErrorService } from '../src/services/error.service'
import { InfoService } from '../src/modules/report/services/info.service'

describe('express ', async () => {
  const { moduleMap } = await Factory([ReportController, ErrorService, InfoService])

  function createError(uid: string) {
    return {
      level: 'error' as const,
      uid,
      breadcrumb: ['1'],
    }
  }
  function createInfo(uid: string) {
    return {
      level: 'info' as const,
      uid,
    }
  }

  it('express app will handle exception and error', async () => {
    await (moduleMap.get('info') as InfoService).create(createInfo('1'))
    await (moduleMap.get('error') as ErrorService).create(createError('test'))
    const ret = await (moduleMap.get('error') as ErrorService).find({ uid: 'test' })
    console.log(ret)
  })
})
