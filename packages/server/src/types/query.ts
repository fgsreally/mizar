export namespace Q{
  export interface ErrorStatistics {
    count: number

  }
  export interface ErrorInstance {
    count: number
    stack: string
    message: string
    arr: string[]
  }
}

export namespace R{
  export interface Request {
    method: string

    url: string

    params: any
    elapsedTime: number
    status: string
  }

  export interface ResourceError {
    source_type: string
    href: string
  }

  export interface RuntimeError {
    stack: string
  }

  export interface Route {
    from: string
    to: string
  }
}
