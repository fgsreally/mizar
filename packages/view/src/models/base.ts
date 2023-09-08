export class BaseModel {
  projectId = getGlobal('projectId') as string
  errorId = getGlobal('errorId') as string||'1'
  errorIds: string[] = ['10', '30']
}
