import { getModelForClass, prop } from '@typegoose/typegoose'

export class RecordEntity {
  @prop({required: true,})
  data!: any

  @prop({required: true,})
  type!: string

  @prop({ required: true, ref: () => ProjectEntity })
  project!: Ref<ProjectEntity>


}

export const RecordModel = getModelForClass(RecordEntity)
