import { Inject } from 'phecda-server'
import { ReportService } from '../report/report.service'
import { ReportModel } from '../report/report.model'
import type { RecordEntity } from './record.model'
import { RecordModel } from './record.model'
import { RECORD_EVENT } from '@/common'

@Inject
export class RecordService {
  constructor(protected reportService: ReportService) {

  }

  readonly RecordModel = RecordModel
  readonly ReportModel = ReportModel
  // 每小时统计
  public async corn() {
    return await this.errorStatistics()
  }

  private aggregate(data: any[]) {
    return this.ReportModel.aggregate(data, {
      allowDiskUse: true,
    })
  }

  private addRecord(data: RecordEntity<any> | RecordEntity<any>[]) {
    return this.RecordModel.create(data)
  }

  private async errorStatistics() {
    const now = new Date()
    const pastOneHour = new Date()
    pastOneHour.setHours(pastOneHour.getHours() - 1)
    const errorOrReject = await this.aggregate([{
      $match: {
        level: 'error',
        type: {
          $in: ['error', 'reject'],
        },
        time: {
          $gt: pastOneHour,
          $lte: now,
        },
      },
    },

    {
      $group: {
        _id: { project: '$project', stack: '$data.stack', message: '$message', type: '$type' },
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
        'data.message': '$_id.message',
        'data.type': '$_id.type',
        'data.count': '$count',
      },
    },
    {
      $addFields: {
        type: RECORD_EVENT.ERROR_INSTANCE,
        time: now,
      },
    },

    ])

    const requestError = await this.aggregate([{
      $match: {
        level: 'error',
        type: {
          $in: ['fetch', 'xhr'],
        },
        time: {
          $gt: pastOneHour,
          $lte: now,
        },
      },
    },

    {
      $group: {
        _id: { project: '$project', url: '$data.url', type: '$type' },
        arr: { $push: '$_id' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        '_id': 0,
        'data.arr': '$arr',
        'project': '$_id.project',
        'data.url': '$_id.url',
        'data.message': '$_id.message',
        'data.type': '$_id.type',
        'data.count': '$count',
      },
    },
    {
      $addFields: {
        type: RECORD_EVENT.ERROR_INSTANCE,
        time: now,
      },
    }])

    const allErrors = [...errorOrReject, ...requestError]
    const statisRecord: Record<string, { count: number }> = {}

    allErrors.forEach((item) => {
      if (!(item.project in statisRecord)) {
        statisRecord[item.project] = {
          count: 0,
        }
      }
      statisRecord[item.project].count += item.data.count
    })

    this.addRecord(Object.entries(statisRecord).map(([project, data]) => {
      return {
        project,
        data,
        time: now,
        type: RECORD_EVENT.ERROR_STATISTICS,
      } as RecordEntity<{ count: number }>
    }))
    this.addRecord(allErrors)
    return {
      errorOrReject,
      requestError,
    }
  }
}
