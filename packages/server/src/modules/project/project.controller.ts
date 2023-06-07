import { Body, Controller, Define, Get, Param, Post } from 'phecda-server'

import type { ProjectService } from './project.service'
import type { ProjectEntity } from './project.model'
import { Auth } from '@/decorators/auth'

@Auth()
@Controller('/project')
export class ProjectController {
  constructor(protected projectService: ProjectService) {

  }

  @Post('')
  // @Middle('x-monitoring-system')
  async createProject(@Body() body: ProjectEntity) {
    return await this.projectService.create(body)
  }

  @Get('/:name')
  async getProjectInfo(@Param('name') name: string) {
    return await this.projectService.findByName(name)
  }
}
