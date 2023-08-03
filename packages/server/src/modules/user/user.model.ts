import { getModelForClass, prop } from '@typegoose/typegoose'
import { hashSync } from 'bcryptjs'

export enum Permission {
  ADMIN = 'admin',
  USER = 'user',
}
class UserEntity {
  // _id!: Types.ObjectId
  @prop({ required: true, enum: Permission })
  permission!: string

  @prop({ required: true })
  name!: string

  @prop({ required: true })
  email!: string

  @prop({
    select: false,
    get(val) {
      return val
    },
    set(val) {
      return val ? hashSync(val) : val
    },
  })
  password!: string
}

const UserModel = getModelForClass(UserEntity)

export { UserEntity, UserModel }
