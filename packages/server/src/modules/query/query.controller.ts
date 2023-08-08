import { Body, Controller, Get, NotFoundException, Post, Query } from 'phecda-server'

import type { RecordEntity } from '../record/record.model'
import { ProjectService } from '../project/project.service'
import { ReportService } from '../report/report.service'
import type { ReportEntity } from '../report/report.model'
import type { Q } from '../../types/query'
import { QueryService } from './query.service'

// @Middle('project')
@Controller('/query')
export class QueryController {
  context: any
  constructor(protected queryService: QueryService, protected projectService: ProjectService, protected reportService: ReportService) {

  }

  @Get('/error_statistics')
  async getErrorStatistics(@Query('projectId') projectId: string, @Query('timestart') timestart: string, @Query('timeend') timeend: string) {
    return this.queryService.getErrorStatistic(projectId, [new Date(timestart), new Date(timeend)])
  }

  @Get('/error_record')
  async getErrorRecord(@Query('uid') uid: string[] | string) {
    return this.reportService.findByuid(uid)
  }

  @Post('/error_playback')
  async getPlayback(@Query('errorId') uid: string) {
    const [report] = await this.reportService.findByuid(uid)
    if (!report)
      throw new NotFoundException('没有对应uid的信息')
    return this.reportService.findNearest(report.user, report.time, report.project as string) as Promise<ReportEntity[]>
  }

  // @Get('/error_actions')
  // async getActions(@Query('errorId') errorId: string) {
  //   const action = await this.reportService.findById(errorId)

  //   return this.reportService.Model.find({
  //     user: action.user,
  //     timestamp: {
  //       $lt: action.time,
  //       // $gt: action.timestamp - 10 * 60,
  //     },
  //   }).sort({ timestamp: -1 }).limit(20)
  // }

  @Post('/error_actions')
  async getActions(@Body('time') time: string, @Body('projectId') projectId: string) {
    return this.queryService.getErrorActions(time, projectId) as Promise<RecordEntity<Q.ErrorInstance>[]>
  }
}
