import type { Breadcrumb } from './breadcrumb'
import type { BrowserSubTypes, MethodTypes, PlatformTypes } from './constant'
import type { formatDate, generateUUID } from './utils'

export interface MonitorCtx {
  report: (...args: any[]) => any
  breadcrumb: Breadcrumb
  uploadUrl: string
  log: (arg: any, type: string) => void
  setGlobal: (key: string, cb: (...args: any) => any) => void
  generateUUID: typeof generateUUID
  formatDate: typeof formatDate
}

export type Plugin = (ctx: MonitorCtx) => void

export interface IAnyObject {
  [key: string]: any
}

export interface CodeErrorType extends ReportDataMsgType, CodeErrorDataType {}
export interface CodeErrorDataType {
  message: string
  lineno: number
  colno: number
  filename: string
}
export enum BrowserBreadcrumbTypes {
  ROUTE = 'Route',
  CLICK = 'UI.Click',
  CONSOLE = 'Console',
  XHR = 'Xhr',
  FETCH = 'Fetch',
  UNHANDLEDREJECTION = 'Unhandledrejection',
  RESOURCE = 'Resource',
  CODE_ERROR = 'CodeError',
  CUSTOMER = 'Customer',
  FRAMEWORK = 'Framework',
  LIFECYCLE = 'LifeCycle',
  CRASH = 'Crash',
  MICRO = 'Micro',
}
export enum BreadcrumbLevel {
  FATAL = 'fatal',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export type BreadcrumbTypes = BrowserBreadcrumbTypes | string

export interface BreadcrumbPushData {
  eventId: string
  type: BreadcrumbTypes
  message: string
  level?: BreadcrumbLevel
  time?: number
}

export enum EventTypes {
  API = 'api',
  DOM = 'dom',
  PERFORMANCE = 'performance',
  ROUTE = 'route',
  ERROR = 'error',
  CONSOLE = 'console',
  CUSTOMER = 'customer',
  VUE = 'vue',
  LIFECYCLE = 'lifeCycle',
  EXTEND = 'extend',
  RECORD = 'record',
  MICRO = 'micro',
}
export interface HttpRequest {
  method: MethodTypes | string
  url: string
  data?: IAnyObject
}

export interface HttpResponse {
  status?: number
  data?: IAnyObject | string
  msg?: string
}

export interface HttpCollectDataType {
  request: HttpRequest
  response: HttpResponse
  time: number
  elapsedTime?: number
}

export type voidFun = () => void

export interface RecordDataType {
  events: any[]
}

export enum RecordTypes {
  SESSION = 'session',
}

export interface ReportDataType<T> {
  // 标识id
  id: string
  // 时间戳

  time: string
  // 事件类型

  type: EventTypes
  // 具体数据，json格式

  data: T
  // 行为记录

  breadcrumb?: BreadcrumbPushData[]
}

export interface ReportDataMsgType {
  sub_type: BrowserSubTypes | string
}

export interface ClientInfoType {
  // 平台
  platform: PlatformTypes
  // 应用id
  app_id?: string
  session_id?: string
  // 页面标题
  page_title?: string
  // 路径
  path?: string
  // 语言
  language?: string
  // 配置

  user_agent?: string
}

export interface VueReportDataType extends ReportDataMsgType {
  name: string
  message: string
  hook: string
  stack: string
  lineno?: number
  colno?: number
  filename?: string
}

export interface VueConfiguration {
  errorHandler?(err: Error, vm: any, info: string): void
  warnHandler?(msg: string, vm: any, trace: string): void
  [key: string]: any
}
