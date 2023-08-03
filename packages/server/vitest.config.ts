import { fileURLToPath } from 'node:url'
import { swcUnplugin as swc } from 'unplugin-swc-esm'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [swc.vite()],
})
