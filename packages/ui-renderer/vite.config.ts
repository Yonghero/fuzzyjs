import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
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
      entry: path.resolve(__dirname, './index.ts'),
      name: '@fuzzy-next/ui-renderer',
      fileName: format => `@fuzzy-next/ui-renderer.${format}.js`,
    },
    outDir: path.resolve(__dirname, './dist'),
    // emptyOutDir: false,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-demi', 'elementPlus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
