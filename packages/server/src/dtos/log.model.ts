import { prop } from '@typegoose/typegoose'
import { ProjectEntity } from './project.model'

enum PLATFORM {
  BROWSER = 1,
}

export abstract class LogEntity {
  abstract level: string

  //   @prop({ required: true })
  //   public type!: string

  //   @prop({ required: true })
  //   public message!: string

  @prop({ required: true })
  public uid!: string

    @prop({ required: true })
    public time!: string

    @prop({ required: true, ref: () => ProjectEntity })
    public project!: ProjectEntity

    @prop({ required: true, enum: PLATFORM })
    public platform!: PLATFORM

    @prop({ required: true })
    page_title!: string // 页面标题

    @prop({ required: true })
    path!: string // 页面路径

    @prop({ required: true })
    language!: string // 站点语言

  @prop({ required: true })
  user_agent!: string, // 浏览器标识

  @prop({ required: true })
  message!: string // 信息
}
