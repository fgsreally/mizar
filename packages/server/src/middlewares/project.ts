import type { ProjectService } from '@/modules/project/project.service'

export function projectMiddleware(projectService: ProjectService) {
  return async (req: any, _: any, next: any) => {
    const u = new URLSearchParams(req.url.split('?')[1] || '')
    if (u.has('project'))
      req.project = projectService.findById(u.get('project')!)
    next()
  }
}
