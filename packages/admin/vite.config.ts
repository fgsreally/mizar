import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import transformerDirectives from '@unocss/transformer-directives'
import { presetAttributify, presetUno } from 'unocss'
import AutoImport from 'unplugin-auto-import/vite'
import presetIcons from '@unocss/preset-icons'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [VueMacros({
    setupBlock: true,
    plugins: {
      vue: Vue({
        reactivityTransform: true,

      }),
    },
  }),
  AutoImport({
    dirs: ['./src/**/*'],
    imports: ['vue', 'vue-router'],
    resolvers: [],
  }),
  Components({
    dirs: ['./src/components'],
    directoryAsNamespace: false,
    resolvers: [],

  }),
  ReactivityTransform(),
  UnoCSS({
    transformers: [
      transformerDirectives(),
    ],
    theme: {

    },
    presets: [
      presetIcons({ /* options */ }),

      presetAttributify(),
      presetUno(),
    ],
  })],
})
