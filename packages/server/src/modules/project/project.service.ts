import { BadRequestException, Init, Tag } from 'phecda-server'

import type { ProjectEntity } from './project.model'
import { ProjectModel } from './project.model'

@Tag('project')
export class ProjectService {
  public ids: string[] = []

  readonly Model = ProjectModel
  @Init
  async init() {
    const ret = await this.getAll()
    this.ids = ret.map(item => item._id.toString())
  }

  async create(body: Omit<ProjectEntity, '_id'>) {
    const ret = await this.Model.create(body)
    this.ids.push(ret._id.toString())
    return ret
  }

  async findById(id: string) {
    const ret = await this.Model.findById(id)
    if (!ret)
      throw new BadRequestException('没找到同名项目')
    return ret
  }

  async findByName(name: string) {
    const ret = await this.Model.findOne({ name })
    if (!ret)
      throw new BadRequestException('没找到同名项目')
    return ret
  }

  async getAll() {
    return this.Model.find({})
  }
}
