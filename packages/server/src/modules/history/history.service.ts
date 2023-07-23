import { Inject } from 'phecda-server'
import { ProjectService } from '../project/project.service'
import { LogService } from '../report/services/query.service'
import { HistoryModel } from './history.model'
import { Auth } from '@/decorators/auth'

@Auth()
@Inject
export class HistoryService {
  constructor(private readonly projectService: ProjectService, private readonly logService: LogService) {
  }

  readonly Model = HistoryModel

  async updateHistory(projectName: string) {
    const project = await this.projectService.findByName(projectName)

    const data = await this.Model.findOne({ project }).sort({ time: -1 }).exec()
    if (!data)
      return

    const errorRecord = await this.logService.getErrorInTime(project.id, data.time)
    if (errorRecord)

      this.Model.insertMany(errorRecord)
  }

  async getByDate(projectName: string, date: Date) {
    const project = await this.projectService.findByName(projectName)

    const today = new Date() // 获取当前日期
    const fiveDaysAgo = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000) // 计算五天前的日期

    return this.Model.aggregate([
      {
        $match: {
          timestamp: {
            $gte: date,
            $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      },
    ])
  }
}
