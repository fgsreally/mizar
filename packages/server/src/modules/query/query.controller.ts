import { Controller, Define, Get, Param, Query } from 'phecda-server'

import { QueryService } from './query.service'
@Controller('/query')
export class QueryController {
  constructor(protected queryService: QueryService) {

  }

  @Get('/error_statistics')
  getErrorStatistics() {
    return this.queryService.getErrorStatic()
  }
}
