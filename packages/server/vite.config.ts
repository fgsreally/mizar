import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
export default defineConfig(() => {
  return {
    ssr: {
      format: 'cjs',
    },
    server: {
      port: 3699,
    },
    plugins: [

      VitePluginNode({
        adapter: 'express',
        tsCompiler: 'swc',
        appPath: './src/server.ts',
      }),
    ],
  }
})
