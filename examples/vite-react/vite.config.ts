import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import AutoImport from '../../src/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    AutoImport({
      imports: 'react',
      dts: './src/auto-imports.d.ts',
    }),
  ],
})
