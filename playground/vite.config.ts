import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import AutoImport, { pickTypes } from '../src/vite'

const types = pickTypes([
  {
    vue: ['Ref', 'ComputedRef'],
  },
])

export default defineConfig({
  plugins: [
    Vue(),
    Inspect(),
    AutoImport({
      imports: 'vue',
      types,
    }),
  ],
})
