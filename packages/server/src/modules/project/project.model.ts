import { getModelForClass, prop } from '@typegoose/typegoose'

class ProjectEntity {
  _id!: string

  @prop({ required: true, unique: true })
   name!: string

  @prop({ required: true, default: '' })
  description!: string

  @prop()
  linearId?: string
}

const ProjectModel = getModelForClass(ProjectEntity)

export { ProjectEntity, ProjectModel }
