import { Init } from 'phecda-server'
import * as mongoose from 'mongoose'
import { Severity, setGlobalOptions } from '@typegoose/typegoose'
import { logger } from '@/utils/log'

export class ConfigController {
  @Init
  async init() {
    console.log(1)
    // logger.info('start connect')
    await mongoose.connect(import.meta.env.VITE_DB_URL, { dbName: import.meta.env.VITE_DB_NAME })

    // logger.info('connect db success')
  }
}
