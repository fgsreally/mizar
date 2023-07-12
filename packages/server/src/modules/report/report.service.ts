import { Inject, NotFoundException } from 'phecda-server'
import type { ReportEntity } from './report.model'
import { ReportModel } from './report.model'

@Inject
export class ReportService {
  readonly Model = ReportModel

  create(arr: ReportEntity[]) {
    return this.Model.create(...arr)
  }

  async findById(id: string) {
    const record = await this.Model.findById(id)
    if (!record)
      throw new NotFoundException('没有对应的记录')
    return record
  }
}
