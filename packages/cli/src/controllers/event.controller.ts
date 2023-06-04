import { Body, Controller, Param, Post, emitter } from 'phecda-server'

@Controller('/mizar')
export class EventController {
  @Post('/:event')
  async invokePuppeteerEvent(@Body() body: any, @Param('event') event: string) {
    // @ts-expect-error support inject event
    emitter.emit(event, body)
  }
}
