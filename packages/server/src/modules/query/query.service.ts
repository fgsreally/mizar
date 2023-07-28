import { Inject } from 'phecda-server'
import mongoose from 'mongoose'
import { ReportService } from '../report/report.service'
import { RecordModel } from '../record/record.model'
import { RECORD_EVENT } from '@/common'

@Inject
export class QueryService {
  constructor(protected reportService: ReportService) {

  }

  readonly Model = RecordModel

  public async getErrorActions(time: string, projectId: string) {
    return this.Model.aggregate([
      {
        $project: {
          data: 1,
          time: { $dateToString: { format: /^\d{4}-\d{2}-\d{2}$/.test(time) ? '%Y-%m-%d' : '%H:%M', date: '$time' } },
          project: 1,
          type: 1,
        },
      },
      {
        $match: {
          project: new mongoose.Types.ObjectId(projectId),
          type: RECORD_EVENT.ERROR_INSTANCE,
          time,
        },
      },

    ]).exec()
  }

  public async getErrorStatistic(projectId: string, [timestart, timeend]: [Date, Date]) {
    const ret = await this.Model.aggregate([
      {
        $match: {
          project: new mongoose.Types.ObjectId(projectId),
          type: RECORD_EVENT.ERROR_STATISTICS,
          time: {
            $gte: timestart,
            $lte: timeend,
          },
        },
      },

      {
        $group: {
          _id: { $dateToString: { format: diffDay(timestart, timeend) > 0 ? '%Y-%m-%d' : '%H:%M', date: '$time' } },
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
