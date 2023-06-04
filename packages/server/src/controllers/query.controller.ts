import { Body, Controller, Get, Post, Query } from 'phecda-server'

import type { ReportModel } from '../dtos/report.model'
import { ErrorService } from '../services/error.service'
@Controller('/query')
export class QueryController {
  constructor(protected errorService: ErrorService) {

  }

  @Get('')
  async getData(@Query('project') project: string, @Query('limit') limit = 10, @Query('skip') skip = 0) {
    return this.errorService.find({ project }, limit, skip)
  }
}
