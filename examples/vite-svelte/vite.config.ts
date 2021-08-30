import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import AutoImport from '../../src/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    AutoImport({
      imports: [
        'svelte',
        'svelte/store',
        'svelte/transition',
      ],
    }),
  ],
})
