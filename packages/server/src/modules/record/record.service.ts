import { Inject } from 'phecda-server'
import { ReportService } from '../report/report.service'
import { ReportModel } from '../report/report.model'
import { RecordModel } from './record.model'
import { RECORD_EVENT } from '@/common'

@Inject
export class RecordService {
  constructor(protected reportService: ReportService) {

  }

  readonly Model = RecordModel
  readonly ReportModel = ReportModel
  // 每小时统计
  public async corn() {
    return await this.computeError()
  }

  private async computeError() {
    const ret = await this.ReportModel.aggregate([{
      $match: {
        level: 'error',
        timestamp: {
          $gte: Date.now() - 1000 * 60 * 60,
        },
      },
    },

    {
      $group: {
        _id: { project: '$project', message: '$message', url: '$url' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        '_id': 0,
        'project': '$_id.project',
        'data.message': '$_id.message',
        'data.count': '$count',
      },
    },
    {
      $addFields: {
        type: RECORD_EVENT.ERROR_STATISTICS,
      },
    },

    ], {
      allowDiskUse: true,
    })

    // ret.forEach((item: any) => item.type = RECORD_EVENT.ERROR_STATISTICS)
    this.Model.create(ret)
    return ret
  }
}
