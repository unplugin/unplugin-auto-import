import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from '../src/vite'
import { componentResolver } from '../src'

export default defineConfig({
  plugins: [
    Vue(),
    Inspect(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      resolvers: [componentResolver(ElementPlusResolver())],
    }),
  ],
})
