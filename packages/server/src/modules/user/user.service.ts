import { Tag } from 'phecda-server'
import type { UserEntity } from './user.model'
import { UserModel } from './user.model'
import { BaseService } from '@/utils/base.service'
@Tag('user')
export class UserService extends BaseService<typeof UserEntity> {
  readonly Model = UserModel
}
