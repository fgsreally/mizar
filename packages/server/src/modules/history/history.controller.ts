import { Body, Controller, Define, Get, Param, Post } from 'phecda-server'

import type { HistoryService } from './history.service'

@Define('author', true)
@Controller('/history')
export class ProjectController {
  constructor(protected historyService: HistoryService) {

  }

  @Get('/:project')
  async getProjectInfo(@Param('project') project: string) {
    return await this.historyService.findOne({ name: project })
  }
}
