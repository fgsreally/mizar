import { BadRequestException, Inject } from 'phecda-server'

import type { LogEntity } from '../models/log.model'
import { LogModel } from '../models/log.model'
import type { ProjectEntity } from './project.model'
import { ProjectModel } from './project.model'
import { BaseService } from '@/utils/base.service'

@Inject
export class LogService extends BaseService<typeof ProjectEntity> {
  constructor() {
    super()
  }

  readonly Model = ProjectModel
}
