import axios from 'axios'
import { createReq, useC ,} from 'phecda-client'
import { Message } from '@arco-design/web-vue'

import { QueryController } from '../../../server/src/modules/query/query.controller'
const instance = axios.create({ baseURL: import.meta.env.VITE_BASE_URL })


instance.interceptors.request.use(config=>{
   const token= getQuery('token')
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

export function toAsync<F extends (...args: any) => any>(pcRequest: ReturnType<typeof createReq>, cb: F) {
    return async (...params: Parameters<F>) => pcRequest(cb(...params as any) as ReturnType<F>)
}

export  const { getErrorStatistics,getActions,getErrorRecord,getPlayback } = useC(QueryController)


export  const $request=createReq(instance)




