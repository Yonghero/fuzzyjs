import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'

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
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './fuzzy-next/index.ts'),
      name: 'fuzzy',
      fileName: format => `fuzzy-next.${format}.js`,
    },
    outDir: './lib',
    // emptyOutDir: false,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'elementPlus', 'vueDemi'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
