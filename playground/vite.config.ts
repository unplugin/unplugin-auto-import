import Vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import AutoImport from '../src/vite'

export default defineConfig({
  plugins: [
    Vue(),
    Inspect(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      resolvers: [
        ElementPlusResolver(),
      ],
      dirs: [
        './composables/**',
        './directives/**',
      ],
      vueTemplate: true,
      vueDirectives: {
        isDirective(normalizeImportFrom, _importEntry) {
          return normalizeImportFrom.includes('/directives/')
        },
      },
    }),
  ],
})
