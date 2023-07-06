import { Body, Controller, Get, Middle, NotFoundException, Param, Post, Query, Tag } from 'phecda-server'
import { ProjectService } from '../project/project.service'
import { ReportService } from './report.service'
import type { ReportEntity } from './report.model'
import { RecordService } from './record.service'

@Controller('/record')
export class RecordController {
  constructor(protected recordService: RecordService) {

  }

  @Get('/time')
  // @Middle('x-monitoring-system')
  async corn() {
    return this.recordService.corn()
  }
}
