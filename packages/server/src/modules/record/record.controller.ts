import { Controller, Get } from 'phecda-server'

import { RecordService } from './record.service'

@Controller('/record')
export class RecordController {
  constructor(protected recordService: RecordService) {

  }

  @Get('/time')
  // @Middle('x-monitoring-system')
  async corn() {
    return this.recordService.corn()
  }
}
