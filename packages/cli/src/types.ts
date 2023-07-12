export interface FetchOptions {
  sourcemapParser?: (url: string) => string
  htmlTags?: HtmlTag[]
  reqEventHandler?: (params: any) => void
}

export interface Options {
  patterns: string; fetchOptions: FetchOptions
}

interface HtmlTag {
  injectTo?: 'head-prepend' | 'head' | 'body' | 'body-prepend'
  tag: string
}
