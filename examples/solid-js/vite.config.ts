import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import AutoImport from '../../src/vite'

export default defineConfig({
  plugins: [
    solidPlugin(),
    Icons({
      compiler: 'solid',
    }),
    AutoImport({
      imports: ['solid-js', '@solidjs/router'],
      dts: './src/auto-imports.d.ts',
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
  ],
  build: {
    target: 'esnext',
  },
})
