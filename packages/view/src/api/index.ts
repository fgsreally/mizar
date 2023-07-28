import axios from 'axios'
import { createReq, useC ,} from 'phecda-client'
import { Message } from '@arco-design/web-vue'

import { QueryController } from '../../../server/src/modules/query/query.controller'
const instance = axios.create({ baseURL: getGlobal('baseUrl') })


instance.interceptors.request.use(config=>{
   const token= getGlobal('token')
   if(token)config.headers.Authorization=token
   return config
},error => {
    // 请求错误消息提示
    Message.error({
        content: error.message,
        position: "bottom"
    });
    return Promise.reject(error.data.error.message);
 }

)


export  const { getErrorStatistics,getActions,getErrorRecord,getPlayback } = useC(QueryController)


export  const $request=createReq(instance)




