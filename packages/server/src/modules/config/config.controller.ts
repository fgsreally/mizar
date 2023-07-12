import { Init } from 'phecda-server'
import * as mongoose from 'mongoose'
import { Severity, setGlobalOptions } from '@typegoose/typegoose'
import { logger } from '@/utils/log'

export class ConfigController {
  @Init
  async init() {
    // logger.info('start connect')
    await mongoose.connect(import.meta.env.VITE_DB_URL, { dbName: import.meta.env.VITE_DB_NAME })
    console.log('connect')

    // logger.info('connect db success')
  }
}
