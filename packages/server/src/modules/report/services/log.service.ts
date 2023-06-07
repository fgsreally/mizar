import { BadRequestException, Inject } from 'phecda-server'

import type { LogEntity } from '../models/log.model'
import { LogModel } from '../models/log.model'
import { formatDate } from '@/utils/time'

const Hour = 60 * 60 * 1000

@Inject
export class LogService {
  readonly Model = LogModel

  async getByUid(uid: string) {
    const ret = await this.Model.findOne({ uid }).populate('project')
    if (!ret)
      throw new BadRequestException('找不到对应的错误')

    return ret
  }

  async getByProject(projectId: string, limit = 10, skip = 0) {
    const ret = await this.Model.find({ project: projectId }).limit(limit).populate('project')
    if (!ret)
      throw new BadRequestException('找不到该项目相关的错误')
    return ret
  }

  async getUserLog(project: string, user: string, timestamp: number) {
    const ret = await this.find({
      project,
      user,
      timestamp: {
        $gte: new Date(timestamp - Hour),
        $lt: new Date(timestamp + Hour),
      },
    }, 100).populate('project')
    if (!ret)
      throw new BadRequestException(`找不到项目${project}、用户${user}在${formatDate(timestamp)}相关的记录`)
    return ret
  }

  async getErrorInTime(projectId: string, time: number) {
    const pipeline = [
      {
        $match: {
          project: projectId,
          level: 'error',
          timestamp: { $gte: time },
        },
      },
      {
        $project: {
          hour: {
            $floor: {
              $divide: [
                { $subtract: [Date.now(), '$timestamp'] },
                1000 * 60 * 60, // 将毫秒转换为小时
              ],
            },
          },
          date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },

        },
      },
      {
        $group: {
          _id: '$hour',
          count: { $sum: 1 },
          // 其他聚合计算字段
        },
      },

      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
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
    return ret || []
  }
}
