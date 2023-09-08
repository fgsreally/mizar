import axios from 'axios'
import { createReq, useC } from 'phecda-client'
import { Message } from '@arco-design/web-vue'
import { QueryController } from '../../../server/src/modules/query/query.controller'
if (import.meta.env.DEV) {
  window.MIZAR_SDK = {
    baseUrl: '/api',

    projectId: '64fad0dd1646b3b25353a5f4',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZhY2Y4ZWQ0Y2U5ZTU5MWRkZWJjZGMiLCJpYXQiOjE2OTQxNTg3MzQsImV4cCI6MjAwOTUxODczNH0.1xErCGZOoFiLx6WCALs-8IcizwfQMdz7NQWT_PtE0eI',
  }
}
const instance = axios.create({ baseURL: getGlobal('baseUrl') })

instance.interceptors.request.use((config) => {
  const token = getGlobal('token')
  if (token)
    config.headers.Authorization = token
  return config
}, (error) => {
  // 请求错误消息提示
  Message.error({
    content: error.message,
    position: 'bottom',
  })
  return Promise.reject(error.data.error.message)
},

)

export const { getErrorStatistics, getActions, getErrorRecord, getPlayback } = useC(QueryController)

export const $Req = createReq(instance)
