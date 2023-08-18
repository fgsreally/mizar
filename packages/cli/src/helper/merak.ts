import type { HtmlTag } from '../types'

export function documentPicInPic(text: string, selector: string, options?: any): HtmlTag {
  return {
    injectTo: 'body',
    tag: `<script type="module">const el = document.querySelector(\`${selector}\`);
    if(window.documentPictureInPicture){
      const btn=document.createElement('button')
      btn.innerHTML='${text}'
      btn.style='position:fixed;z-index:100;'
      document.body.append(btn)
      btn.onclick=()=>{
        documentPictureInPicture.requestWindow(${options ? JSON.stringify(options) : ''}).then((w)=>{
          w.document.body.append(el);
          });
      }
    }
   
  </script>`,
  }
}

export function merakTag(apps: { id: string; url: string }[], dev = false): HtmlTag {
  return {
    injectTo: 'body',
    tag: `<script type="module">
import {Merak} from '${dev ? 'https://esm.sh/merak-core/dist/dev/index.mjs' : 'https://esm.sh/merak-core/dist/prod/index.mjs'}'
import {CompileLoader} from '${dev ? 'https://esm.sh/merak-core/dist/dev/loaders/index.mjs' : 'https://esm.sh/merak-core/dist/prod/loaders/index.mjs'}'
const loader=new CompileLoader()
${apps.reduce((c, r) => {
  return `${c}\nnew Merak('${r.id}', '${r.url}', { loader });
  const el =document.createElement('merak-app');
  el.setAttribute('data-merak-id','${r.id}');
  document.body.append(el)`
}, '')}
</script>`,
  }
}
