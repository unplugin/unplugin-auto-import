import React from '@vitejs/plugin-react-refresh'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import AutoImport from '../../src/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    React(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
    }),
    AutoImport({
      imports: ['react', 'react-router-dom', 'react-i18next', 'ahooks'],
      dts: './src/auto-imports.d.ts',
      dirs: ['src/layouts', 'src/views'],
      eslintrc: {
        enabled: true,
      },
      defaultExportByFilename: true,
      resolvers: [
        IconsResolver({
          componentPrefix: 'Icon',
        }),
      ],
    }),
  ],
})
