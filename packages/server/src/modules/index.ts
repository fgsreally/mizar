import { FileController } from './file/file.controller'
import { ProjectController } from './project/project.controller'
import { LinearController } from './linear/linear.controller'

import { UserController } from './user/user.controller'
import { ConfigController } from './config/config.controller'
import { ReportController } from './report/report.controller'
import { RecordController } from './record/record.controller'
import { QueryController } from './query/query.controller'
import { MockController } from './mock/mock.controller'

export default [
  ConfigController,
  UserController,
  FileController,

  ProjectController,
  LinearController,
  ReportController,
  RecordController,
  QueryController,
  MockController,

]
