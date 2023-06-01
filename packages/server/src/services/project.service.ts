import { BadRequestException, Tag } from 'phecda-server'

import type { ProjectEntity } from '../dtos/project.model'
import { ProjectModel } from '../dtos/project.model'
import { BaseService } from './base.service'
@Tag('project')
export class ReportService extends BaseService<typeof ProjectEntity> {
  readonly Model = ProjectModel
  async create(data: Omit<ProjectEntity, '_id' | 'id'>) {
    try {
      return await super.create(data)
    }
    catch (e) {
      throw new BadRequestException('已存在重名数据')
    }
  }
}
