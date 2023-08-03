import { type Ref, getModelForClass, prop } from '@typegoose/typegoose'
import { UserEntity } from '../user/user.model'

class ProjectEntity {
  _id?: string

  @prop({ required: true, unique: true })
   name!: string

  @prop({ required: true, default: '' })
  description!: string

  @prop({ required: true, ref: () => UserEntity })
  creator!: Ref<UserEntity>

  @prop()
  linearId?: string
}

const ProjectModel = getModelForClass(ProjectEntity)

export { ProjectEntity, ProjectModel }
