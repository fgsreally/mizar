/* eslint-disable @typescript-eslint/no-use-before-define */
import { NanoStorage } from 'nano-storage'
import { createRoot, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import type { Over } from '../view/DropPanel'
import { exampleData } from '../view/exampleData'
import { keyGet } from './keyHelper'
import type { testx } from './testx'
import { $$user, $request } from '@/api'

export const appUrl = 'https://testflowy.com'
export const sdkStorage = NanoStorage(
  'testflowy-sdk-session',
  {
    isExample: false,
    token: '',
    uid: '',
    email: '',
    isHidden: true,
    agent: '',
    owner: '',
    createAt: '',
    plant: 'pc' as 'mobile' | 'pc',
    run: 'none' as 'none' | 'replay' | 'record' | 'idle',
    id: '',
    updateAt: '',
    step: 0,
    multiple: false,
    name: '',
    over: 'top' as Over,
    events: [] as TestflowyEvent[],
    passList: {} as Record<string, boolean>,
    meta: {} as Record<string, string>,
    runType: '' as 'draft' | 'task' | '',
    speed: 1,
    localPwd: '',
    focusFail: false,
  },
  'localStorage',
)

export type Menus = 'testing' | 'license' | 'team' | 'setting' | 'battery'
export const [appMenu, setAppMenu] = createRoot(() => createSignal<Menus>('testing'))

export const [focusFail, _setFocusFail] = createRoot(() => createSignal(sdkStorage.val.focusFail))

export const setFocusFail = (focus: boolean) => {
  _setFocusFail(focus)
  sdkStorage.assign({ focusFail: focus })
}

export const sdkActionLogin = async (user: { email: string; password: string }) => {
  if (!user)
    return
  // const user=getGlobal('user')
  const { data } = await $request($$user.login(user))

  sdkStorage.set({
    uid: data._id as any,
    email: data.email,
    token: data.token,
    // owner: res.owner || '',
    // agent: res.agent || '',
    // plant: res.plant as 'pc',
    // createAt: res.createAt,
  })
  return true
}

export const [isHidden, _setIsHidden] = createRoot(() => createSignal(sdkStorage.val.isHidden))
export const setIsHidden = (isHidden: boolean) => {
  _setIsHidden(isHidden)
  sdkStorage.assign({ isHidden })
  if (!keyGet(document.body, 'testflowy-id2'))
    location.reload()
}

export const [isExample, _setExample] = createRoot(() => createSignal(sdkStorage.val.isExample))
export const setIsExample = (isExample: boolean) => {
  _setExample(isExample)
  if (isExample) {
    if (!sdkStorage.val.events.length) {
      setRun('idle')
      setPanel('tool')
    }
    sdkStorage.assign({
      id: exampleData.id,
      name: exampleData.name,

      events: exampleData.events as any,
      // step: 0,
      // step: exampleData.events.length,
      meta: exampleData.meta,
    })
  }
}

export const [mouse, setMouse] = createRoot(() =>
  createStore({
    left: -100,
    top: -100,
    rotate: 0,
    scale: 1,
  }),
)

export type TesterElement = { htmlFor: unknown | null } & HTMLSelectElement & HTMLInputElement

export const logout = () => {
  sdkStorage.clear()
  setLogined(false)
  setPanel('logo')
}

export const [showEditor, setShowEditor] = createRoot(() => createSignal(false))
export const [editorOnlyView, setEditorOnlyView] = createRoot(() => createSignal(false))

export type Panel = 'logo' | 'tool' | 'panel' | 'loading'

export const names = {
  Role: 'findAllByRole',
  Text: 'findAllByText',
  TestId: 'getAllByTestId',
} as Record<string, keyof typeof testx>

export interface TestflowyEvent {
  key: string
  id: string
  role: string
  id2: string
  id3: string
  event: string
  tag: string
  value?: string
  type?: string
  other?: Record<string, unknown>
  taskId?: string
  isLast?: boolean
  error?: string
  code?: string
  isCrypto?: boolean
  wait?: number
  // role?: { m: string; a: { t: number; v: string }[] }[];
}

export const getSdkAuth = () => {
  return { uid: sdkStorage.val.uid, token: sdkStorage.val.token, plant: sdkStorage.val.plant }
}

export const [panel, _setPanel] = createRoot(() => createSignal<Panel>('logo'))
export const setPanel = (p: Panel) => {
  if (p === 'panel') {
    _setPanel(p)
    return
  }
  _setPanel('loading')
  setTimeout(() => {
    _setPanel(p)
  }, 140)
}
export const [name, setName] = createRoot(() => createSignal<string>(sdkStorage.val.name))
export const [lastRecord, _setLastRecord] = createRoot(() =>
  createSignal(sdkStorage.val.events[sdkStorage.val.events.length]),
)
export const [logined, setLogined] = createRoot(() => createSignal(!!sdkStorage.val.token))

export const setLastRecord = (e: TestflowyEvent, meta?: Record<string, string>) => {
  _setLastRecord(e)
  sdkStorage.assign({ events: [...sdkStorage.val.events, e], meta: { ...sdkStorage.val.meta, ...meta } })

  setRecordLength(sdkStorage.val.events.length)
}

export const [lastReplay, setLastReplay] = createRoot(() =>
  createSignal(JSON.stringify(sdkStorage.val.events[sdkStorage.val.events.length])),
)
export const [recordLength, setRecordLength] = createRoot(() => createSignal(sdkStorage.val.events.length))

export const [run, _setRun] = createRoot(() => createSignal(sdkStorage.val.run))
export const [err, setErr] = createRoot(() => createSignal(''))

export const [step, _setStep] = createRoot(() => createSignal(sdkStorage.val.step))
export const setStep = (n: number) => {
  sdkStorage.assign({ step: n })
  _setStep(n)
}

const getSessionEventKeys = () => {
  const keys = sessionStorage.getItem('testflowyEventKeys')
  if (!keys)
    return []

  return JSON.parse(keys)
}

export const setSessionEventKeys = (keys: string[]) => {
  sessionStorage.setItem('testflowyEventKeys', JSON.stringify(keys))
}

export const eventKeys = new Set<string>(getSessionEventKeys())
export const setEventKeys = (key: string) => {
  eventKeys.add(key)
  setSessionEventKeys(Array.from(eventKeys))
}

export const setRun = (r: typeof sdkStorage.val.run) => {
  _setRun(r)
  sdkStorage.assign({ run: r })
}

export const [inFoucs, setInFoucs] = createRoot(() => createSignal(false))

export const [license, setLicense] = createRoot(() => createSignal<any>({ id: '', end: '', owner: '' }))
