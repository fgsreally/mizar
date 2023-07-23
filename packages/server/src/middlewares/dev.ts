import { BadRequestException } from 'phecda-server'
import { minimatch } from 'minimatch'

export function devOnly(paths: string[]) {
  return (req: any, res: any, next: any) => {
    if (import.meta.env.PROD) {
      for (const path of paths) {
        if (minimatch(req.url, path))
          throw new BadRequestException('只有开发环境可以mock数据')
      }
    }

    next()
  }
}
