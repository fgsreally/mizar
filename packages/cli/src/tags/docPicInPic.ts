import type { HtmlTag } from '../types'

export function docPicInPicTag(text: string, selector: string, options?: any): HtmlTag {
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
