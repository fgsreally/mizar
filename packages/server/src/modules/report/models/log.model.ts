import type { Ref } from '@typegoose/typegoose'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { ProjectEntity } from '@/modules/project/project.model'

enum PLATFORM {
  BROWSER = 1,
}

export class LogEntity {
  @prop({ required: true })
     level!: 'performance' | 'error' | 'info'

  @prop({ required: true })
     type!: string

  @prop({ required: true })
   uid!: string

  @prop({ required: true })
   timestamp!: string

  @prop({ required: true, ref: () => ProjectEntity })
   project!: Ref<ProjectEntity>

  @prop({ required: true, enum: PLATFORM })
   platform!: PLATFORM

  @prop({ required: true })
    page_title!: string // 页面标题

  @prop({ required: true })
    url!: string // 页面路径

  @prop({ required: true })
    language!: string // 站点语言

  @prop({ required: true })
  user_agent!: string // 浏览器标识

  @prop({ required: true })
  message!: string // 信息

  @prop({ required: true })
  user!: string // 用户

  @prop()
  data!: any
}

export const LogModel = getModelForClass(LogEntity)
