import { describe, expect, it } from 'vitest'
import { Factory } from 'phecda-server'

import type { Ref } from '@typegoose/typegoose'
import type { UserEntity } from '../src/modules/user/user.model'
import type { ProjectEntity } from '../src/modules'
import { ProjectService, QueryService, RecordService, ReportService } from '../src/modules'
import { ConfigModule } from './config.module'
import { UserService } from '@/modules/user/user.service'
describe('Collect upload data and analyse ', async () => {
  const data = await Factory([
    ConfigModule,
    UserService,
    ProjectService,
    RecordService,
    ReportService,
    QueryService,

  ])
  let user: Ref<UserEntity>, project: Ref<ProjectEntity>
  const User = data.moduleMap.get('user') as UserService
  const Project = data.moduleMap.get('project') as ProjectService
  const Report = data.moduleMap.get('report') as ReportService
  const Record = data.moduleMap.get('record') as RecordService
  const Query = data.moduleMap.get('query') as QueryService

  it('create project', async () => {
    user = await User.create({ name: 'fgs', email: 'test@a.com', password: '1111111', permission: 'user' })
    project = await Project.create({ name: 'test app', description: 'for test', creator: user })
    expect((await Project.Model.find({})).length).toBe(1)
  })

  it('report error data', async () => {
    const data: any[] = []
    for (let i = 0; i < 20; i++) {
      data.push({
        level: 'error',
        type: 'error',
        uid: i,
        time: new Date(),
        project,
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

    const messages = (await Query.getErrorActions(getCurrentDate(), (project as any)._id)).map((item) => {
      return item.data.message
    })
    expect(messages).toContain('test1')
    expect(messages).toContain('test2')
    const statistics = await Query.getErrorStatistic((project as any)._id, [

      new Date(new Date().getTime() - 50000),
      new Date(),
    ])
    expect(statistics[0].total).toBe(20)
  })
})
