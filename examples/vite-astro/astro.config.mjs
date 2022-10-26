import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import AutoImport from 'unplugin-auto-import/astro'
import svelte from '@astrojs/svelte'
import react from '@astrojs/react'
// https://astro.build/config
export default defineConfig({
  integrations: [vue({
    reactivityTransform: true,
  }),
  svelte(),
  react(),
  AutoImport({
    imports: [
      'vue',
      'vue/macros',
      'svelte',
      'svelte/store',
      'react',
    ],
    dts: './src/auto-imports.d.ts',
  })],
})
