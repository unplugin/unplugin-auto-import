import { defineConfig } from 'vite'
import AutoImport from '../../src/vite'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: [
      'vue',
    ],
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    AutoImport({
      imports: [
        'vitepress',
        'vue',
      ],
      dts: './.vitepress/theme/auto-imports.d.ts',

    }),
  ],
})
