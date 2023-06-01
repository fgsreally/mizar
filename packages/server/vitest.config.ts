import { defineConfig } from 'vite'
import { swcUnplugin } from 'unplugin-swc-esm'

export default defineConfig({
  plugins: [
    swcUnplugin.vite(),
  ],
  test: {
    globals: true,
    globalSetup: [
      './__test__/setup.ts',
    ],
  },
})
