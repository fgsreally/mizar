import { Inject } from 'phecda-server'
import { ReportService } from '../report/report.service'
import { RecordModel } from '../record/record.model'
import { RECORD_EVENT } from '@/common'

@Inject
export class QueryService {
  constructor(protected reportService: ReportService) {

  }

  readonly Model = RecordModel
  // 每小时统计
  public async getErrorStatic() {
    return this.Model.find({
      type: RECORD_EVENT.ERROR_STATISTICS,
    }).populate({
      path: 'project',

    }).exec()
  }
}
