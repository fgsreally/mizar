import { Factory, bindApp } from 'phecda-server'
import express from 'express'
import portfinder from 'portfinder'
import { EventController } from './controllers/event.controller'

export async function startServer(port: number) {
  const data = await Factory([EventController])
  const app = express()
  app.use(express.json())
  portfinder.setBasePort(port)
  port = await portfinder.getPortPromise()
  bindApp(app, data)
  app.listen(port)
  return port
}
