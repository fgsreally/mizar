import { Tag } from 'phecda-server'
import { UserModel } from './user.model'
@Tag('user')
export class UserService {
  readonly Model = UserModel

  findById(id: string) {
    return this.Model.findById(id)
  }
}
