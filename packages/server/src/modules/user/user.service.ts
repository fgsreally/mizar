import { Tag } from 'phecda-server'
import { type UserEntity, UserModel } from './user.model'
@Tag('user')
export class UserService {
  readonly Model = UserModel
  create(user: UserEntity) {
    return UserModel.create(user)
  }

  findByEmail(email: string) {
    return UserModel.findOne({ email })
  }

  findById(id: string) {
    return UserModel.findById(id)
  }
}
