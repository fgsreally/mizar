import { Inject } from 'phecda-server'
import { ReportService } from '../report/report.service'
import { RecordModel } from '../record/record.model'
import type { ProjectEntity } from '../project/project.model'
import { RECORD_EVENT } from '@/common'

@Inject
export class QueryService {
  constructor(protected reportService: ReportService) {

  }

  readonly Model = RecordModel
  // 每小时统计
  public async getErrorStatistic(project: ProjectEntity, boundary: [number, number]) {
    return this.Model.find({
      'type': RECORD_EVENT.ERROR_STATISTICS,
      project,
      'data.timestamp': { $gte: boundary[0], $lte: boundary[1] },
    }).populate({
      path: 'project',
    }).exec()
  }
}
