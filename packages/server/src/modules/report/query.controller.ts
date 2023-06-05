import { Controller, Define, Get, Param, Query } from 'phecda-server'

import type { LogService } from './services/log.service'
@Define('author', true)
@Controller('/query')
export class QueryController {
  constructor(protected logService: LogService) {

  }

  @Get('/:project')
  async getProjectLog(@Param('project') project: string, @Query('limit') limit = 10, @Query('skip') skip = 0) {
    return this.logService.getByProject(project, limit, skip)
  }

  @Get('/user/log')
  async getUserLog(@Query('project') project: string, @Query('user') user: string, @Query('timestamp') timestamp: number) {
    return this.logService.getUserLog(project, user, timestamp)
  }

  @Get('/error')
  async getError(@Query('project') project: string, @Query('timestamp') timestamp: number) {
    return this.logService.getErrorInTime(project, timestamp)
  }

  async countError(project: string, timestamp: number) {
    const ret = await this.getError(project, timestamp)
  }
}
