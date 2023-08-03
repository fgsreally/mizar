import { Body, Controller, NotFoundException, Post } from 'phecda-server'
import { ProjectService } from '../project/project.service'
import { ReportService } from './report.service'
import type { ReportEntity } from './report.model'

@Controller('/report')
export class ReportController {
  constructor(protected reportService: ReportService, protected projectService: ProjectService) {

  }

  @Post('')
  // @Middle('x-monitoring-system')
  async report(@Body('', false) body: {
    tasks: any[]
    base: Omit<ReportEntity, 'data'>
  }) {
    if (!body.base?.project)
      throw new NotFoundException('上传的数据需要绑定项目')
    if (!this.projectService.ids.includes(body.base.project as unknown as string))
      throw new NotFoundException('不存在对应的项目')
    return await this.reportService.create(body.tasks.map((task) => {
      task.time = new Date(task.time)
      return Object.assign(task, body.base) as any
    }))
  }
}
