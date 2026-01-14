import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/*.ts'],
  dts: true,
  exports: true,
  inlineOnly: ['@antfu/utils'],
  external: [
    // dts
    'vite',
    'rollup',
    'rolldown',
    'webpack',
    'esbuild',
    '@nuxt/schema',
  ],
})
