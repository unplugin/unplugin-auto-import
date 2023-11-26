import { defineConfig } from 'vite'
import { svelte as Svelte } from '@sveltejs/vite-plugin-svelte'
import Inspect from 'vite-plugin-inspect'
import AutoImport from '../../src/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Svelte(),
    Inspect(),
    AutoImport({
      imports: [
        'svelte',
        'svelte/store',
        'svelte/transition',
      ],
      packagePresets: [{
        package: 'detect-browser-es',
      }],
      dts: './src/auto-imports.d.ts',
    }),
  ],
})
