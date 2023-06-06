import { Inject } from 'phecda-server'
import dayjs from 'dayjs'
import type { ProjectService } from '../project/project.service'
import type { LogService } from '../report/services/log.service'
import type { HistoryEntity } from './history.model'
import { HistoryModel } from './history.model'
import { BaseService } from '@/utils/base.service'

@Inject
export class HistoryService extends BaseService<typeof HistoryEntity> {
  constructor(private readonly projectService: ProjectService, private readonly logService: LogService) {
    super()
  }

  readonly Model = HistoryModel

  async updateHistory() {
    const data = await this.findOne().sort({ time: -1 }).exec()
    if (!data)
      return

    const timeOffset = dayjs(Date.now()).diff(data.time, 'hour')
    const projects = this.projectService.find()
  }
}
