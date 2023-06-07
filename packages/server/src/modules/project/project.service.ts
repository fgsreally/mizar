import { BadRequestException, Inject } from 'phecda-server'

import type { ProjectEntity } from './project.model'
import { ProjectModel } from './project.model'

@Inject
export class ProjectService {
  readonly Model = ProjectModel

  async create(body: ProjectEntity) {
    return this.Model.create(body)
  }

  async findByName(name: string) {
    const ret = await this.Model.findOne({ name })
    if (!ret)
      throw new BadRequestException('没找到同名项目')
    return ret
  }

  async getAll() {
    return this.Model.find()
  }
}
