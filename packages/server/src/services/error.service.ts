import { BadRequestException, Inject } from 'phecda-server'
import type { ErrorEntity } from '../dtos/error.model'
import { ErrorModel } from '../dtos/error.model'
import type { InfoEntity } from '../dtos/info.model'
import { InfoService } from './info.service'
import { BaseService } from './base.service'

@Inject
export class ErrorService extends BaseService<typeof ErrorEntity> {
  constructor(private readonly infoService: InfoService) {
    super()
  }

  readonly Model = ErrorModel


  async getByUid(uid: string) {
    const ret = await this.findOne({ uid }).populate('project').populate('breadcrumb')
    if (!ret)
      throw new BadRequestException('找不到对应的错误')

    return ret
  }

  async getByProject(project: string, limit?: number, skip?: number) {
    const ret = await this.find({ project }, limit, skip).populate('project').populate('breadcrumb')
    if (!ret)
      throw new BadRequestException('找不到该项目相关的错误')
    return ret
  }

  async getErrorInTime(time = 60 * 60 * 1000) {
    const oneHourAgo = new Date(Date.now() - time) // 一个小时之前的时间

    const pipeline = [
      {
        $match: {
          createdAt: { $gte: oneHourAgo },
        },
      },
      {
        $group: {
          _id: '$message',
          count: { $sum: 1 },
        },
      },
    ]
    const ret = await this.Model.aggregate(pipeline)
    return ret
  }
}
