import type { Ref } from '@typegoose/typegoose'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { ProjectEntity } from '../project/project.model'

class HistoryEntity {
  _id!: string

  @prop({ required: true })
   time!: number

  @prop({ required: true })
   date!: string

  @prop({ required: true })
  errorCount!: string

  @prop({ required: true, type: () => ProjectEntity })
  project!: Ref<ProjectEntity>
}

const HistoryModel = getModelForClass(HistoryEntity)

export { HistoryEntity, HistoryModel }
