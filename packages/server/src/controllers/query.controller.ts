import { Body, Controller, Get, Post, Query } from 'phecda-server'

import { ReportService } from '../services/info.service'
import type { ReportModel } from '../dtos/report.model'
@Controller('/query')
export class QueryController {
  constructor(protected reporter: ReportService) {

  }

  @Get('')
  async getData(@Query('project') project: string, @Query('limit') limit = 10, @Query('skip') skip = 0) {
    return this.reporter.find({ project }, limit, skip)
  }
}
