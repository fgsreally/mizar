import type { Ref } from '@typegoose/typegoose'
import { getModelForClass, prop } from '@typegoose/typegoose'
import type { ProjectEntity } from '../project/project.model'

class HistoryEntity {
  _id!: string

  @prop({ required: true })
   time!: string

  @prop({ required: true })
  errorCount!: string

  @prop({ required: true })
  project!: Ref<ProjectEntity>
}

const HistoryModel = getModelForClass(HistoryEntity)

export { HistoryEntity, HistoryModel }
