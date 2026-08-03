import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/*.ts'],
  dts: { tsgo: true },
  exports: true,
  deps: {
    onlyBundle: ['@antfu/utils'],
    neverBundle: [
      // dts
      'vite',
      'rollup',
      'rolldown',
      'webpack',
      'esbuild',
      '@nuxt/schema',
    ],
  },
  publint: 'ci-only',
})
