import { defineConfig } from 'vite'
import AutoImport from './src/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        'vitest',
      ],
      dts: true,
    }),
  ],
})
