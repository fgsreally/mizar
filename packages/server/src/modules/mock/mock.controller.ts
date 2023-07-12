import { BadRequestException, Controller, Get } from 'phecda-server'
import { faker } from '@faker-js/faker'
import { ProjectService } from '../project/project.service'
import { ReportService } from '../report/report.service'

const errorMsg = [
  '错误A',
  '错误B',
  '错误C',
]

const errorStack = [
  `TypeError: Cannot read properties of null (reading 'length')
  at http://127.0.0.1:8080/:16:14`,
  `TypeError: Cannot read properties of null (reading 'name')
  at http://127.0.0.1:8080/:16:15`,
  `TypeError: Cannot read properties of null (reading 'fgs')
  at http://127.0.0.1:8080/:16:16`,

]

const userId = [
  '1', '2', '3',
]

@Controller('/mock')
export class MockController {
  constructor(protected reportService: ReportService, protected projectService: ProjectService) {

  }

  @Get('/report')
  async mock() {
    const project = await this.projectService.create({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),

    })

    for (let i = 0; i < 10; i++) {
      await this.reportService.create([{
        level: 'error',

        type: 'error',

        uid: faker.string.uuid(),

        timestamp: Date.now() - Math.floor(Math.random() * 3) * 10000,

        project,

        platform: 1,

        page_title: '测试页面',

        url: 'example.com',

        language: 'cn',

        user_agent: 'chrome',

        message: errorMsg[Math.floor(Math.random() * 3)],

        user: 'fgs',

        data: {
          stack: errorStack[Math.floor(Math.random() * 3)],
        },
      }])
    }
  }
}
