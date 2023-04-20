import type { Plugin, ReportDataMsgType, ReportDataType } from '../types'
import { EventTypes, PerTypes } from '../constant'
import { formatDate, generateUUID } from '../utils'
import getBasic from './lib/basic'
import getVitals from './lib/vitals'
import getResources from './lib/resources'
import FPSTool from './lib/fps'
import FMPTiming from './lib/fmp'

export interface PerformanceBasicMsgType extends ReportDataMsgType {
  dnsSearch: number // DNS 解析耗时
  tcpConnect: number // TCP 连接耗时
  sslConnect: number // SSL安全连接耗时
  request: number // TTFB 网络请求耗时
  response: number // 数据传输耗时
  parseDomTree: number // DOM 解析耗时
  resource: number // 资源加载耗时
  domReady: number // DOM Ready
  httpHead: number // http 头部大小
  interactive: number // 首次可交互时间
  complete: number // 页面完全加载
  redirect: number // 重定向次数
  redirectTime: number // 重定向耗时
  duration: number
  fp: number // 渲染出第一个像素点，白屏时间
  fcp: number // 渲染出第一个内容，首屏结束时间
}
interface ResourceType {
  name: string
  time: number
}

export interface PerformanceSingleMsgType extends ReportDataMsgType {
  value: number | ResourceType[]
}

export interface PerformanceVitalsMsgType extends ReportDataMsgType {
  lcp: number
  fid: number
  cls: number
}

export enum PerformanceFeat {
  BASIC = 'basic',
  RESOURCE = 'resource',
  FMP = 'fmp',
  FPS = 'fps',
  VITALS = 'vitals',
}

export function perf(performancOff: string[] = []): Plugin {
  return ({ report }) => {
    // 禁用标识
    function transform(collectedData: CollectedData): ReportDataType<CollectedData> {
      return {
        id: generateUUID(),
        time: formatDate(),
        type: EventTypes.PERFORMANCE,
        data: {
          ...collectedData,
        },
      }
    }
    let fpsTool = new FPSTool()
    if (!performancOff.includes(PerformanceFeat.FPS))
      fpsTool = new FPSTool()

    // fmp
    if (!performancOff.includes(PerformanceFeat.FMP)) {
      const fmpTiming = new FMPTiming()
      fmpTiming.initObserver().then((fmp) => {
        report({
          sub_type: PerTypes.FMP,
          value: fmp,
        })
      })
    }
    // vitals
    if (!performancOff.includes(PerformanceFeat.VITALS)) {
      getVitals().then((vitals) => {
        report(transform({
          sub_type: PerTypes.VITALS,
          ...vitals,
        }))
      })
    }
    window.addEventListener(
      'load',
      () => {
        // 基础参数
        if (!performancOff.includes(PerformanceFeat.BASIC)) {
          report(transform({
            sub_type: PerTypes.BASIC,
            ...getBasic(),
          }))
        }
        // 资源耗时
        if (!performancOff.includes(PerformanceFeat.RESOURCE)) {
          report(transform({
            sub_type: PerTypes.RESOURCE,
            value: getResources(),
          }))
        }
        // fps
        if (!performancOff.includes(PerformanceFeat.FPS)) {
          fpsTool.run()
          setTimeout(() => {
            report(transform({
              sub_type: PerTypes.FPS,
              value: fpsTool.get(),
            }))
            fpsTool.destroy()
          }, 500)
        }
      },
      true,
    )
  }
}
type CollectedData = PerformanceSingleMsgType | PerformanceBasicMsgType | PerformanceVitalsMsgType
