import { resolve } from 'path'
import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
let base
// https://vitejs.dev/config/
export default defineConfig({
  base: 'aac',
  plugins: [vue()],
  build: { sourcemap: true },
})
