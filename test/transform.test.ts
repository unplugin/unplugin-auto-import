import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import { glob } from 'tinyglobby'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { describe, expect, it } from 'vitest'
import { createContext } from '../src/core/ctx'

describe('transform', async () => {
  const ctx = createContext({
    imports: [
      'vue',
      'pinia',
      'quasar',
      'react',
      'svelte',
      'svelte/animate',
      'svelte/easing',
      'svelte/motion',
      'svelte/store',
      'svelte/transition',
      'vitest',
      {
        'custom': [
          'customNamed',
          ['default', 'customDefault'],
          ['default', 'customDefaultAlias'],
        ],
        'ignored': [
          'ignored',
        ],
        'vue-dollar': [
          '$',
        ],
        'three.js': [
          ['*', 'THREE'],
        ],
      },
    ],
    ignore: [
      'ignored',
      'useId', // Duplicate in both Vue and React
    ],
    resolvers: [
      (name) => {
        return name.startsWith('customResolved')
          ? `custom/resolved/${name.slice('customResolved'.length)}`
          : null
      },
      (name) => {
        return name.startsWith('customNamedResolved')
          ? {
              from: `custom/resolved/${name.slice('customNamedResolved'.length)}`,
              name: `_${name}`,
            }
          : null
      },
      ElementPlusResolver({
        importStyle: 'css',
      }),
    ],
  })

  const root = resolve(__dirname, 'fixtures')
  const files = await glob('*', {
    cwd: root,
    onlyFiles: true,
  })

  for (const file of files) {
    it(file, async () => {
      const fixture = await fs.readFile(resolve(root, file), 'utf-8')
      const pass1 = (await ctx.transform(fixture, file))?.code ?? fixture
      expect(pass1).toMatchSnapshot()
      const pass2 = (await ctx.transform(pass1, file))?.code ?? pass1
      expect(pass2).toBe(pass1)
    })
  }
})

describe('transform-vue-macro', async () => {
  const ctx = createContext({
    imports: [
      'vue/macros',
    ],
  })

  const root = resolve(__dirname, 'fixtures-vue-macro')
  const files = await glob('*', {
    cwd: root,
    onlyFiles: true,
  })

  for (const file of files) {
    it(file, async () => {
      const fixture = await fs.readFile(resolve(root, file), 'utf-8')
      const pass1 = (await ctx.transform(fixture, file))?.code ?? fixture
      expect(pass1).toMatchSnapshot()
      const pass2 = (await ctx.transform(pass1, file))?.code ?? pass1
      expect(pass2).toBe(pass1)
    })
  }
})
