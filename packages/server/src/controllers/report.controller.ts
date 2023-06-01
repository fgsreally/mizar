import { Body, Controller, Get, Middle, Param, Post, Tag } from 'phecda-server'
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

  @Get('/:uid')
  async getError(@Param('uid') uid: string) {
    return this.errorService.getAll(uid)
  }
}
