import { Tag } from 'phecda-server'
import mongoose, { Types } from 'mongoose'
import { ReportService } from '../report/report.service'
import { RecordModel } from '../record/record.model'
import { RECORD_EVENT } from '../../common'

@Tag('query')
export class QueryService {
  constructor(protected reportService: ReportService) {

  }

  readonly Model = RecordModel

  public async getErrorActions(time: string, namespaceId: string) {
    return this.Model.aggregate([
      {
        $project: {
          data: 1,
          createdAt: { $dateToString: { format: /^\d{4}-\d{2}-\d{2}$/.test(time) ? '%Y-%m-%d' : '%H:%M', date: '$createdAt' } },
          namespace: 1,
          category: 1,
        },
      },
      {
        $match: {
          category: RECORD_EVENT.ERROR_INSTANCE,
          namespace: new Types.ObjectId(namespaceId),
        },
      },

    ]).exec()
  }

  public async getErrorStatistic(namespaceId: string, [timestart, timeend]: [Date, Date]) {
    const ret = await this.Model.aggregate([
      {
        $match: {
          namespace: new mongoose.Types.ObjectId(namespaceId),
          category: RECORD_EVENT.ERROR_STATISTICS,
          createdAt: {
            $gte: timestart,
            $lte: timeend,
          },
        },
      },

      {
        $group: {
          _id: { $dateToString: { format: diffDay(timestart, timeend) > 0 ? '%Y-%m-%d' : '%H:%M', date: '$createdAt' } },
          total: {
            $sum: '$data.count',
          },
        },
      },
      {
        $project: {
          date: '$_id',
          total: 1,
          _id: 0,
        },
      },

    ]).exec()
    return ret as { date: string; total: number }[]
  }
}

function diffDay(d1: Date, d2: Date) {
  return (d2.getTime() - d1.getTime()) / 1000 / 60 / 60 / 24
}
