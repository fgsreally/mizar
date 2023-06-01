import { getModelForClass, prop } from '@typegoose/typegoose'
import { LogEntity } from './log.model'

class InfoEntity extends LogEntity {
  @prop({ required: true })
  public level!: 'info'

  @prop()
  data!: any
}

const InfoModel = getModelForClass(InfoEntity)

export { InfoEntity, InfoModel }
