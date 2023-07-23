import { type Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { ProjectEntity } from '../project/project.model'

export class RecordEntity<CustomData> {
  @prop({ required: true })
  data!: CustomData

  @prop({ required: true })
  type!: string

  @prop({ ref: () => ProjectEntity })
  project?: Ref<ProjectEntity>

  @prop({ required: true })
  time!: Date
}

export const RecordModel = getModelForClass(RecordEntity)
