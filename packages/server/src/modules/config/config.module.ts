import { Init } from 'phecda-server'
import * as mongoose from 'mongoose'
import { logger } from '../../utils/log'

export class ConfigModule {
  @Init
  async init() {
    await mongoose.connect(process.env.DB_URL!, { dbName: process.env.DB_NAME })
    logger.info('connect mongodb')
  }
}
