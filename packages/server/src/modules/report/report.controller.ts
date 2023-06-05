import { Body, Controller, Get, Middle, Param, Post, Query, Tag } from 'phecda-server'
import type { LogService } from './services/log.service'
import type { LogEntity } from './models/log.model'

@Controller('/report')
export class ReportController {
  constructor(protected logService: LogService) {

  }

  @Post('')
  // @Middle('x-monitoring-system')
  async report<E extends LogEntity>(@Body(undefined, false) body: E) {
    return await this.logService.addLog(body)
  }
}
