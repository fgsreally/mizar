import { Inject } from 'phecda-server'
import type { ReportEntity } from './report.model'
import { ReportModel } from './report.model'

@Inject
export class ReportService {
  readonly Model = ReportModel

  create(arr: ReportEntity[]) {
    return this.Model.create(...arr)
  }
}
