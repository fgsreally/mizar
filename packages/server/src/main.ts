import { Factory, addGuard, addMiddleware, bindApp } from 'phecda-server'
import express from 'express'
import modules from './modules'
import { jwtGuard } from './guards/jwt'
import { uploadMiddleware } from './middlewares/upload'
import cors from 'cors'
const data = await Factory(modules)
if(import.meta.env.DEV){
  data.output()
}

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
