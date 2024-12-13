import { defineConfig } from 'vitest/config'
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
  test: {
    include: ['test/**/*.test.ts'],
  },
})
