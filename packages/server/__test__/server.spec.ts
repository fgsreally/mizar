import { describe, expect, it } from 'vitest'
import { Factory } from 'phecda-server'

import type { Ref } from '@typegoose/typegoose'
import type { NamespaceDTO } from '../src/modules/index.controller'
import { ConfigModule, NamespaceService, QueryService, RecordService, ReportService, UserService } from '../src/modules/index.controller'
describe('Collect upload data and analyse ', async () => {
  const data = await Factory([
    ConfigModule,
    UserService,
    NamespaceService,
    RecordService,
    ReportService,
    QueryService,

  ])
  let namespace: Ref<NamespaceDTO>
  const User = data.moduleMap.get('user') as UserService
  const Namespace = data.moduleMap.get('namespace') as NamespaceService
  const Report = data.moduleMap.get('report') as ReportService
  const Record = data.moduleMap.get('record') as RecordService
  const Query = data.moduleMap.get('query') as QueryService

  it('create namespace', async () => {
    await User.create({ email: 'test@a.com', password: '1111111' })
    namespace = await Namespace.Model.findOne({ name: 'default' }) as any
    expect((await Namespace.Model.find({})).length).toBe(1)
  })

  it('report error data', async () => {
    const data: any[] = []
    for (let i = 0; i < 20; i++) {
      data.push({
        level: 'error',
        category: 'error',
        uid: i,
        time: new Date(),
        namespace,
        platform: 'test',
        page_title: 'test_title',
        url: 'test.com',
        language: 'test_language',
        user_agent: 'test_agent',
        user: 'test_user',
        message: i < 10 ? 'test1' : 'test2',
      })
    }

    await Report.create(data)
    expect((await Report.Model.find({})).length).toBe(20)
  })

  it('time task to record', async () => {
    await Record.corn()

    expect((await Record.RecordModel.find({})).length).toBe(3)
  })

  it('query data', async () => {
    function getCurrentDate() {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = String(currentDate.getMonth() + 1).padStart(2, '0')
      const day = String(currentDate.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    const messages = (await Query.getErrorActions(getCurrentDate(), (namespace as any)._id))
      .map((item) => {
        return item.data.message
      })
    expect(messages).toContain('test1')
    expect(messages).toContain('test2')
    const statistics = await Query.getErrorStatistic((namespace as any)._id, [

      new Date(new Date().getTime() - 50000),
      new Date(),
    ])
    expect(statistics[0].total).toBe(20)
  })
})
