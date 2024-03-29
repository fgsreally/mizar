import { Factory, addGuard, addMiddleware, bindApp } from 'phecda-server'
import express from 'express'
import cors from 'cors'
import { UserController } from './modules/user/user.controller'
import { ConfigModule } from './modules/config/config.module'
import { ReportController } from './modules/report/report.controller'
import { RecordController } from './modules/record/record.controller'
import { QueryController } from './modules/query/query.controller'
import { FileController } from './modules/file/file.controller'
import { ProjectController } from './modules/project/project.controller'
import { LinearModule } from './modules/webhooks'
import { jwtGuard } from './guards/jwt'
import { uploadMiddleware } from './middlewares/upload'
const data = await Factory([
  ConfigModule,
  UserController,
  FileController,
  ProjectController,
  ReportController,
  RecordController,
  QueryController,
  LinearModule,

])
if (import.meta.env.DEV)
  data.output()

const app = express()

app.use(express.json())
app.use(cors())

// ServerContext.middlewareRecord.upload = uploadMiddleware
addMiddleware('upload', uploadMiddleware)

addGuard('jwt', jwtGuard(data.moduleMap.get('user')!))

bindApp(app, data, { globalGuards: ['jwt'] })

export const viteNodeApp = app

if (import.meta.env.PROD)
  app.listen(3000)
