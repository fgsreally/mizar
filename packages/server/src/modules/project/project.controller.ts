import { Body, Controller, Get, Init, Param, Post } from 'phecda-server'

import { ProjectService } from './project.service'
import type { ProjectEntity } from './project.model'
import { Auth } from '@/decorators/auth'

@Auth()
@Controller('/project')
export class ProjectController {
  constructor(protected projectService: ProjectService) {

  }

  @Post('')
  // @Middle('x-monitoring-system')
  async createProject(@Body() body: Omit<ProjectEntity, '_id'>) {
    return await this.projectService.create(body)
  }

  @Get('/:name')
  async getProjectInfo(@Param('name') name: string) {
    return this.projectService.findByName(name)
  }
}
