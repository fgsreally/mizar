import type { Breadcrumb } from './breadcrumb'
import type { BrowserSubTypes, MethodTypes } from './constant'

export interface MonitorCtx {
  report: (...args: any[]) => any
  breadcrumb: Breadcrumb
  uploadUrl: string
  log: (arg: any, type: string) => void
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
  id: string
  time: string
  type: EventTypes
  data: T
  breadcrumb?: BreadcrumbPushData[]
}

export interface ReportDataMsgType {
  sub_type: BrowserSubTypes | string
}
