import { Tag } from 'phecda-server'
import { ReportService } from '../report/report.service'
import { ReportModel } from '../report/report.model'
import { RECORD_EVENT } from '../../common'
import type { RecordEntity } from './record.model'
import { RecordModel } from './record.model'

@Tag('record')
export class RecordService {
  constructor(protected reportService: ReportService) {

  }

  readonly RecordModel = RecordModel
  readonly ReportModel = ReportModel
  // 每小时统计
  public async corn() {
    return this.errorStatistics()
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
        category: {
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
        _id: { namespace: '$namespace', stack: '$data.stack', message: '$message', category: '$category' },
        arr: { $push: '$_id' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        '_id': 0,
        'namespace': '$_id.namespace',

        'data.arr': '$arr',
        'data.stack': '$_id.stack',
        'data.message': '$_id.message',
        'data.category': '$_id.category',
        'data.count': '$count',
      },
    },
    {
      $addFields: {
        category: RECORD_EVENT.ERROR_INSTANCE,
      },
    },

    ])

    const requestError = await this.aggregate([{
      $match: {
        level: 'error',
        category: {
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
        _id: { namespace: '$namespace', url: '$data.url', category: '$category' },
        arr: { $push: '$_id' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        '_id': 0,
        'namespace': '$_id.namespace',

        'data.arr': '$arr',
        'data.url': '$_id.url',
        'data.message': '$_id.message',
        'data.category': '$_id.category',
        'data.count': '$count',
      },
    },
    {
      $addFields: {
        category: RECORD_EVENT.ERROR_INSTANCE,
      },
    }])

    const allErrors = [...errorOrReject, ...requestError]
    const statisRecord: Record<string, { count: number }> = {}

    allErrors.forEach((item) => {
      const { namespace } = item.data
      if (!(namespace in statisRecord)) {
        statisRecord[namespace] = {
          count: 0,
        }
      }
      statisRecord[namespace].count += item.data.count
    })

    await this.addRecord(Object.entries(statisRecord).map(([namespace, data]) => {
      return {
        namespace,
        data,
        category: RECORD_EVENT.ERROR_STATISTICS,
      }
    }))
    await this.addRecord(allErrors)
    return {
      errorOrReject,
      requestError,
    }
  }
}
