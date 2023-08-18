import { defineConfig, documentPicInPic, merakTag } from 'mizar-cli'
export default defineConfig({
  patterns: ['http://localhost:4173/*'],
  inject: {
    baseUrl: 'base',
  },
  fetch: {
    // sourcemapParser: (url: string) => {
    //   return url.replace('4173', '8080')
    // },
    htmlTags: [
      merakTag([{
        id: 'mizar_view', url: 'http://localhost:5173/index.html',
      }], true),
      documentPicInPic('[data-merak-id="mizar_view"]'),
    ],
  },

})
// https://fgsreally.github.io
