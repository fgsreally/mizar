import { Inject, NotFoundException } from 'phecda-server'
import type { ReportEntity } from './report.model'
import { ReportModel } from './report.model'

@Inject
export class ReportService {
  readonly Model = ReportModel

  create(arr: ReportEntity[]) {
    console.log(arr)
    return this.Model.create(arr)
  }

  findByuid(uid: string[] | string) {
    return this.Model.find({
      uid: {
        $in: Array.isArray(uid) ? uid : [uid],
      },
    })
  }

  async findNearest(userId: string, time: Date, project: string) {
    const ret = await this.Model.find({
      user: userId,
      project,
      time: {
        $lt: time,
      },
    }).sort([['time', -1]]).limit(10)
    return ret
  }

  async findById(id: string) {
    const record = await this.Model.findById(id)
    if (!record)
      throw new NotFoundException('没有对应的记录')
    return record
  }
}
