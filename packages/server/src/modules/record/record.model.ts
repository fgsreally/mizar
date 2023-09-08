import { Ref, getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { NamespaceDTO } from 'megrez-backend'

@modelOptions({ schemaOptions: { timestamps: true } })

export class RecordEntity<Data = any> {
  createdAt?: Date

  @prop({ required: true })
  category!: string

  @prop({ ref: () => NamespaceDTO })
  namespace?: Ref<NamespaceDTO>

  @prop({})
  data!: Data
}

export const RecordModel = getModelForClass(RecordEntity)
