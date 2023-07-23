import { FileController } from './file/file.controller'
import { ProjectController } from './project/project.controller'
import { LinearController } from './linear/linear.controller'

import { UserController } from './user/user.controller'
import { ConfigModule } from './config/config.module'
import { ReportController } from './report/report.controller'
import { RecordController } from './record/record.controller'
import { QueryController } from './query/query.controller'

export default [
  ConfigModule,
  UserController,
  FileController,
  ProjectController,
  LinearController,
  ReportController,
  RecordController,
  QueryController,
]
