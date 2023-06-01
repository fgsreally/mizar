import { Inject } from 'phecda-server'
import type { LogEntity } from '../dtos/log.model'
import type { ErrorEntity } from '../dtos/error.model'
import type { InfoEntity } from '../dtos/info.model'
import { ErrorService } from './error.service'
import { InfoService } from './info.service'

@Inject
export class LogService {
  constructor(private readonly errorService: ErrorService, private readonly infoService: InfoService) {

  }

  addLog<E extends LogEntity>(data: E) {
    switch (data.level) {
      case 'error':
        return this.errorService.create(data as unknown as ErrorEntity)
      case 'info':
        return this.infoService.create(data as unknown as InfoEntity)
    }
  }
}
