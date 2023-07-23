import type { MethodTypes } from './constant'
import type { formatDate, generateUUID } from './utils'

export interface MonitorCtx {
  report: (params: TransformData) => any
  uploadUrl: string
  log: (arg: any, type: string) => void
  setGlobal: (key: string, cb: (...args: any) => any) => void
  generateUUID: typeof generateUUID
  formatDate: typeof formatDate
}

export type TransformData<T = any> = {
  type: string
  message?: string
  level: 'error' | 'log' | 'performance'
  data: T
} | undefined

export type Plugin = (ctx: MonitorCtx) => void

export interface HttpRequest {
  method: MethodTypes | string
  url: string
  data?: any
}

export interface HttpResponse {
  status?: number
  data?: any | string
  msg?: string
}

export interface HttpCollectDataType {
  request: HttpRequest
  response: HttpResponse
  time: number
  elapsedTime?: number
}

export type voidFun = () => void
