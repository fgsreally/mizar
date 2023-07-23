import 'phecda-server'

declare module 'phecda-server'{
      interface Events{
      'send_issue':{
            projectId:string,
            title:string,
            description:string,
            teamid:string
      }
      }
}

