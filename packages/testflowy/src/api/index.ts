import axios from 'axios'
import { createReq, useC } from 'phecda-client'
import { getGlobal } from 'mizar-helper'
import { solidMsg } from 'solid-msg'
import { AssetController, NamespaceController, TeamController, UserController } from '../../../server/src/modules/index.controller'
import { sdkStorage } from '@/record/data'
const instance = axios.create({ baseURL: '/api' || getGlobal('baseUrl') || '127.0.0.1:3000' })

instance.interceptors.request.use((config) => {
  const token = sdkStorage.val.token
  if (token)
    config.headers.Authorization = token
  return config
}, (error) => {
  // 请求错误消息提示
  solidMsg.red('请求失败')
  return Promise.reject(error.data.error.message)
},

)

interface Asset {
  md5: string
  code: string
  crypto: boolean
  steps: number
  pass: boolean
  edited?: boolean
  editName?: string
  selected?: boolean
}

export const $$user = useC(UserController)
export const $$team = useC(TeamController)
export const $$namespace = useC(NamespaceController)

export const $$asset = useC<typeof AssetController<Asset>>(AssetController)

export const $request = createReq(instance)
