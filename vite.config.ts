import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'

const buildConfigs = {
  core: {
    entry: path.resolve(__dirname, './fuzzy-next/runtime-core/index.ts'),
    name: 'fuzzy',
    fileName: format => `fuzzy-core.${format}.js`,
  },
  renderer: {
    entry: path.resolve(__dirname, './fuzzy-next/impl-renderer/index.ts'),
    name: 'fuzzy-renderer',
    fileName: format => `fuzzy-renderer.${format}.js`,
  },
  layoutProvider: {
    entry: path.resolve(__dirname, './fuzzy-next/impl-layout-provider/index.ts'),
    name: 'fuzzy-layoutProvider',
    fileName: format => `fuzzy-layoutProvider.${format}.js`,
  },
}

const currentConfig = buildConfigs[(process.env.LIB_NAME as any)]
console.log(currentConfig, 'c')
if (currentConfig === undefined)
  throw new Error('LIB_NAME is not defined or is not valid')

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'playground')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false,
      },
      style: {
        charset: false,
      },
      scss: {
        charset: false,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: [
        'vue',
      ],
      dts: './playground/auto-imports.d.ts',
    }),
  ],
  optimizeDeps: {
    include: [
      'vue',
    ],
    exclude: [
      'vue-demi',
    ],
  },
  build: {
    lib: {
      ...currentConfig,
    },
    outDir: './lib',
    emptyOutDir: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
