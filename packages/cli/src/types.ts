import type { ConnectOptions, Page } from 'puppeteer-core'
export interface FetchOptions {
  sourcemapParser?: (url: string) => string
  htmlTags?: HtmlTag[]
  reqEventHandler?: (params: any) => void
}

export interface MizarOptions {
  url?: string
  patterns: string[]
  inject?: {
    baseUrl: string
    [key: string]: any
  }
  handlePage?: (page: Page) => void
  fetch?: FetchOptions
  connect?: ConnectOptions// connect option for puppeteer
}

export interface HtmlTag {
  injectTo?: 'head-prepend' | 'head' | 'body' | 'body-prepend'
  tag: string// tag or tags
}
