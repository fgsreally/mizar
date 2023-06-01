import { Tag } from 'phecda-server'
import type { UserEntity } from '../dtos/user.model'
import { UserModel } from '../dtos/user.model'
import { BaseService } from './base.service'
@Tag('user')
export class UserService extends BaseService<typeof UserEntity> {
  readonly Model = UserModel
}
