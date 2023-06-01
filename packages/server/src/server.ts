import { Factory, addGuard, addMiddleware, bindApp } from 'phecda-server'
import express from 'express'
import { ConfigController } from './controllers/config.controller'
import { ReportController } from './controllers/report.controller'
import 'reflect-metadata'
import { jwtGuard } from './guards/jwt'
import { uploadMiddleware } from './middlewares/upload'
const data = await Factory([ConfigController, ReportController])
data.output('pmeta.js')
const app = express()
app.use(express.json())

// ServerContext.middlewareRecord.upload = uploadMiddleware
addMiddleware('upload', uploadMiddleware)

addGuard('jwt', jwtGuard(data.moduleMap.get('user')!))

bindApp(app, data, { globalGuards: ['jwt'] })

export const viteNodeApp = app

if (import.meta.env.PROD)
  app.listen(3000)
