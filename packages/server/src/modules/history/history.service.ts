import { Inject } from 'phecda-server'
import type { ProjectService } from '../project/project.service'
import type { LogService } from '../report/services/log.service'
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
    console.log(errorRecord)
  }
}
