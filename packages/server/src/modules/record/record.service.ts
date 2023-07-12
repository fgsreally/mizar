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
    const now = Date.now()
    const ret = await this.ReportModel.aggregate([{
      $match: {
        level: 'error',
        timestamp: {
          $gte: now - 1000 * 60 * 60,
        },
      },
    },

    {
      $group: {
        _id: { project: '$project', stack: '$data.stack' },
        arr: { $push: '$_id' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        '_id': 0,
        'data.arr': '$arr',
        'project': '$_id.project',
        'data.stack': '$_id.stack',
        'data.count': '$count',
      },
    },
    {
      $addFields: {
        'type': RECORD_EVENT.ERROR_STATISTICS,
        'data.timestamp': now,
      },
    },

    ], {
      allowDiskUse: true,
    })

    // console.log(ret)
    // ret.forEach((item: any) => item.type = RECORD_EVENT.ERROR_STATISTICS)

    return this.Model.create(ret)
  }
}
