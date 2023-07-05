import { Body, Controller, Get, Middle, NotFoundException, Param, Post, Query, Tag } from 'phecda-server'
import { ProjectService } from '../project/project.service'
import { ReportService } from './report.service'
import type { ReportEntity } from './report.model'

@Controller('/report')
export class ReportController {
  constructor(protected reportService: ReportService, protected projectService: ProjectService) {

  }

  @Post('')
  // @Middle('x-monitoring-system')
  async report(@Body(undefined, false) body: {
    d: any[]
    b: Omit<ReportEntity, 'data'>
  }) {
    if (!body.b?.project)
      throw new NotFoundException('上传的数据需要绑定项目')

    if (!this.projectService.ids.includes(body.b.project as unknown as string))
      throw new NotFoundException('不存在对应的项目')
    return await this.reportService.create(body.d.map(item => Object.assign(body.b, item)))
  }
}
