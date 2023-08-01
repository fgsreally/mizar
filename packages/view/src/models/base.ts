export class BaseModel {
  projectId = getGlobal('projectId') as string
  errorId = getGlobal('errorId') as string
  errorIds: string[] = ['10', '30']
}
