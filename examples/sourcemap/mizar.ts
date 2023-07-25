import { defineConfig, merakTag } from 'mizar-cli'
export default defineConfig({
  patterns: ['http://localhost:4173/*'],
  inject: {
    baseUrl: 'base',
  },
  fetch: {
    sourcemapParser: (url: string) => {
      return url.replace('4173', '8080')
    },
    htmlTags: [
      merakTag('mizar_view', 'http://localhost:8080'),
    ],
  },

})
