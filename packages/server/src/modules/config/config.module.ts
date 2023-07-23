import { Init } from 'phecda-server'
import * as mongoose from 'mongoose'
import { logger } from '@/utils/log'

export class ConfigModule {
  @Init
  async init() {
    await mongoose.connect(import.meta.env.VITE_DB_URL, { dbName: import.meta.env.VITE_DB_NAME })
    logger.info('connect mongodb')
  }
}
