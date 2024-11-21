import react from '@astrojs/react'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import AutoImport from 'unplugin-auto-import/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
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
      dirs: ['src/utils/*.ts'],
      dts: './src/auto-imports.d.ts',
    }),
  ],
})
