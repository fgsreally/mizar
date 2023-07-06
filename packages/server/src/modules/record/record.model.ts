import { type Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { ProjectEntity } from '../project/project.model'

export class RecordEntity {
  @prop({ required: true })
  data!: any

  @prop({ required: true })
  type!: string

  @prop({ ref: () => ProjectEntity })
  project?: Ref<ProjectEntity>
}

export const RecordModel = getModelForClass(RecordEntity)
