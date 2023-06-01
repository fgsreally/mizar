import { getModelForClass, prop } from '@typegoose/typegoose'
import { LogEntity } from './log.model'

class PerfEntity extends LogEntity {
  @prop({ required: true, type: 'performance' })
  public level!: 'performance'
}

const PerfModel = getModelForClass(PerfEntity)

export { PerfEntity, PerfModel }
