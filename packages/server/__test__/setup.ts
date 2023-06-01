import { Factory } from 'phecda-server'
import { ConfigController } from '../src/controllers/config.controller'

export default async function () {
  await Factory([ConfigController])
}
