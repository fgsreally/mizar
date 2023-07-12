import { Controller, Define, Get, Middle, NotFoundException, Param, Query } from 'phecda-server'

import mongoose from 'mongoose'
import type { RecordEntity } from '../record/record.model'
import { ProjectService } from '../project/project.service'
import { ReportService } from '../report/report.service'
import { QueryService } from './query.service'
import type { Q } from '@/types/query'

// @Middle('project')
@Controller('/query')
export class QueryController {
  context: any
  constructor(protected queryService: QueryService, protected projectService: ProjectService, protected reportService: ReportService) {

  }

  @Get('/error_statistics')
  async getErrorStatistics(@Query('projectId') projectId: string, @Query('timestart') timestart: number, @Query('timeend') timeend: number) {
    const project = await this.projectService.findById(projectId)

    return this.queryService.getErrorStatistic(project, [timestart, timeend]) as unknown as RecordEntity<Q.ErrorStatistics>
  }

  @Get('/error_actions')
  async getActions(@Query('errorId') errorId: string) {
    const action = await this.reportService.findById(errorId)

    return this.reportService.Model.find({
      user: action.user,
      timestamp: {
        $lt: action.timestamp,
        // $gt: action.timestamp - 10 * 60,
      },
    }).sort({ timestamp: -1 }).limit(20)
  }
}
