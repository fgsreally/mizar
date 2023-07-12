import axios from 'axios'
import { createReq, useC ,} from 'phecda-client'
import { QueryController } from '../../../server/src/modules/query/query.controller'
const instance = axios.create({ baseURL: import.meta.env.VITE_BASE_URL })

export function toAsync<F extends (...args: any) => any>(pcRequest: ReturnType<typeof createReq>, cb: F) {
    return async (...params: Parameters<F>) => pcRequest(cb(...params as any) as ReturnType<F>)
}

export  const { getErrorStatistics,getActions } = useC(QueryController)


export  const $request=createReq(instance)



