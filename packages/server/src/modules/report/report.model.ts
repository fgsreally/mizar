import { type Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { NamespaceDTO } from 'megrez-backend'

export class ReportEntity {
  @prop({ required: true })
  level!: 'performance' | 'error' | 'info'

  @prop({ required: true })
  category!: string

  @prop({ required: true })
  uid!: string

  @prop({ required: true })
  time!: Date

  @prop({ required: true, ref: () => NamespaceDTO })
  namespace!: Ref<NamespaceDTO>

  @prop({ required: true })
  platform!: string

  @prop({ required: true })
  page_title!: string // 页面标题

  @prop({ required: true })
  url!: string // 页面路径

  @prop({ required: true })
  language!: string // 站点语言

  @prop({ required: true })
  user_agent!: string // 浏览器标识

  @prop({ required: true })
  user!: string // 用户

  @prop()
  message!: string // 信息

  @prop()
  data!: any
}

export const ReportModel = getModelForClass(ReportEntity)
