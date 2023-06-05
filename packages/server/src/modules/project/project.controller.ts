import { Body, Controller, Define, Get, Param, Post } from 'phecda-server'

import type { ProjectService } from './project.service'
import type { ProjectEntity } from './project.model'

@Define('author', true)
@Controller('/project')
export class ProjectController {
  constructor(protected projectService: ProjectService) {

  }

  @Post('')
  // @Middle('x-monitoring-system')
  async createProject(@Body() body: ProjectEntity) {
    return await this.projectService.create(body)
  }

  @Get('/:project')
  async getProjectInfo(@Param('project') project: string) {
    return await this.projectService.findOne({ name: project })
  }
}
