import { Tag } from 'phecda-server'
import type { InfoEntity } from '../dtos/info.model'
import { InfoModel } from '../dtos/info.model'
import { BaseService } from './base.service'

@Tag('info')
export class InfoService extends BaseService<typeof InfoEntity> {
  readonly Model = InfoModel

  getInfoByUid(ids: string[]) {
    return this.find({
      uid: {
        $in: ids,
      },
    })
  }
}
