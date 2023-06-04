import { Body, Controller, Get, Middle, Param, Post, Query, Tag } from 'phecda-server'
import { LogService } from '../services/log.service'
import type { LogEntity } from '../dtos/log.model'
import { ErrorService } from './../services/error.service'

@Controller('/report')
export class ReportController {
  constructor(protected logService: LogService, protected errorService: ErrorService) {

  }

  @Post('')
  // @Middle('x-monitoring-system')
  async report<E extends LogEntity>(@Body(undefined, false) body: E) {
    return await this.logService.addLog(body)
  }

  @Get('/error/:uid')
  async getError(@Param('uid') uid: string) {
    return this.errorService.getByUid(uid)
  }
  @Get('/error/:project')
  async getErrorByProject(@Param('project') project: string,@Query('limit') number?: number,@) {
    return this.errorService.getByUid(project,limit,skip)
  }
}
