export class BaseModel {
  projectId = getQuery('projectId') as string || '64b64f4a8f5ebb149debc706'
  errorId = getQuery('errorId') as string || 'ef1e4127-fd15-4f97-bd6e-c764bd57a6c6'
  errorIds: string[] = ['10', '30']
}
