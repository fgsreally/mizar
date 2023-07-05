import { Inject } from 'phecda-server'
import { ReportService } from '../report/report.service'
import { RecordModel } from './record.model'

@Inject
export class RecordService {
  constructor(protected reportService: ReportService) {

  }

  readonly Model = RecordModel

  // 每小时统计
  public async corn() {
    await this.computeError()
  }

  private async computeError() {
    const ret = await this.Model.aggregate([{
      $match: {
        level: 'error',
        timestamp: {
          $gte: new Date(Date.now() - 1000 * 60 * 60),
        },
      },
    }, {
      $lookup:
      {
        from: 'project',
        localField: '_id',
        foreignField: 'project',
        as: 'project',
      },
    },

    {
      $group: {
        _id: { project: '$project', message: '$message' },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: '$_id.project',
        messages: {
          $push: {
            message: '$_id.message',
            count: '$count',
          },
        },
      },
    },
    {
      $unwind: {
        path: '$messages',
        includeArrayIndex: 'idx',
      },
    },
    {
      $project: {
        _id: 0,
        project: '$_id',
        data: '',
      },
    },
    ], {
      allowDiskUse: true,
    })
  }
}
