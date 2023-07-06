import { BadRequestException, Controller, Get } from 'phecda-server'
import { faker } from '@faker-js/faker'
import { ProjectService } from '../project/project.service'
import { ReportService } from '../report/report.service'

const errorMsg = [
  'a//xxx',
  'b//nnn',
  'c//www',
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

        timestamp: Date.now(),

        project,

        platform: 1,

        page_title: '测试页面',

        url: 'example.com',

        language: 'cn',

        user_agent: 'chrome',

        message: errorMsg[Math.floor(Math.random() * 3)],

        user: faker.string.uuid(),

        data: {},
      }])
    }
  }
}
