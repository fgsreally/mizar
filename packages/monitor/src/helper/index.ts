// work for app

export function monitorVue3(app: any) {
  if (!(globalThis as any).MIZAR_SDK?.vue) {
    console.warn('miss mizar vue plugin')
    return
  }
  (globalThis as any).MIZAR_SDK.vue(app)
}


export function setHook(key:string,hook:any){
  if (!(globalThis as any).MIZAR_SDK) {
    return
  }
  (globalThis as any).MIZAR_SDK.hooks[key]=hook
}

export function setGlobal(key:string,value:any){
  if (!(globalThis as any).MIZAR_SDK) {
    return
  }
  (globalThis as any).MIZAR_SDK[key]=value
}