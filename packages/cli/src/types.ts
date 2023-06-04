export interface FetchOptions {
  sourcemapParser?: (url: string) => string
  htmlParser?: (content: string) => string
  reqEventHandler?: (params: any) => void
}

export interface Options {
  patterns: string; fetchOptions: FetchOptions
}
