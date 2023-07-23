import type { ConnectOptions } from 'puppeteer'
export interface FetchOptions {
  sourcemapParser?: (url: string) => string
  htmlTags?: HtmlTag[]
  reqEventHandler?: (params: any) => void
}

export interface Options {
  url: string
  patterns: string[]
  fetch?: FetchOptions
  connect?: ConnectOptions// connect option for puppeteer
}

interface HtmlTag {
  injectTo?: 'head-prepend' | 'head' | 'body' | 'body-prepend'
  tag: string
}
