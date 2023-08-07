import type { ServerFilter } from 'phecda-server'
import { HttpException, UndefinedException } from 'phecda-server'
import { logger } from '../utils/log'

export const Filter: ServerFilter = (e: any) => {
  if (!(e instanceof HttpException))
    e = new UndefinedException(e.message || e)
  logger.error(e.message)
  return e.data
}
