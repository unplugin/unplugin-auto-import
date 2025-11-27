import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/*.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: ['@antfu/utils'],
  },
})
