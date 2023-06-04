import type { Ref } from '@typegoose/typegoose'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { LogEntity } from './log.model'
import { InfoEntity } from './info.model'
class ErrorEntity extends LogEntity {
  @prop({ required: true })
  public level!: 'error'

  @prop()
  data: any

  @prop({
    required: true,
    type: () => InfoEntity,
  })
  breadcrumb!: Ref<InfoEntity >[]
}

const ErrorModel = getModelForClass(ErrorEntity)

export { ErrorEntity, ErrorModel }
