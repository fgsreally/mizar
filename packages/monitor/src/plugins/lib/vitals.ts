import type { Metric } from 'web-vitals'
import { getCLS, getFID, getLCP } from 'web-vitals'
import { formatDecimal } from '../../utils'

interface VitalsType {
  lcp: number // 最大内容渲染时间，2.5s内
  fid: number // 交互性能，应小于 100ms
  cls: number // 视觉稳定性，应小于 0.1
}

function fetchLcp(): Promise<number> {
  return new Promise((resolve) => {
    getLCP((val: Metric) => {
      resolve(val.value)
    })
  })
}

function fetchFid(): Promise<number> {
  return new Promise((resolve) => {
    getFID((val: Metric) => {
      resolve(val.value)
    })
  })
}

function fetchCls(): Promise<number> {
  return new Promise((resolve) => {
    getCLS((val: Metric) => {
      resolve(val.value)
    })
  })
}

export default function (): Promise<VitalsType> {
  return new Promise((resolve) => {
    Promise.all([fetchLcp(), fetchFid(), fetchCls()]).then((results) => {
      const [lcp, fid, cls] = results
      resolve({
        lcp: formatDecimal(lcp, 3),
        fid: formatDecimal(fid, 3),
        cls: formatDecimal(cls, 3),
      })
    })
  })
}
