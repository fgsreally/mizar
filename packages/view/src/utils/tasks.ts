import axios from "axios"
export class Task  {
  async fetch({ url, params, method }: any) {
    const ret = await fetch(url,
        { method, body: JSON.stringify(params) })
      return ret.json()
  }

  async xhr({ url, params, method }: any) {
    //@ts-expect-error work for base axios
      return axios[(method as string).toLowerCase()](url,params)
    
  }

  async history({to}:any){
     location.href=to
  }

  async hash({to}:any){
    location.href=to
 
      }

  async dom_click(){

  }    
}

export const task=new Task()