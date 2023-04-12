import { join } from 'node:path'
import * as fs from 'node:fs'
import { expect, it } from 'vitest'
import { createContext } from '../src/core/ctx'

it('dts', async () => {
  const cwd = process.cwd()
  const ctx = createContext({
    imports: [
      'vue-demi',
      'react',
      'svelte',
      'svelte/animate',
      'svelte/easing',
      'svelte/motion',
      'svelte/store',
      'svelte/transition',
      {
        custom: [
          'customNamed',
          ['default', 'customDefault'],
        ],
        custom2: [
          ['*', 'custom2'],
        ],
        [join(cwd, 'foo.ts')]: ['foo'],
      },
      'vue/macros',
    ],
  })

  expect(await ctx.generateDTS(join(cwd, 'index.d.ts'))).toMatchSnapshot()
})

it('dts2', async () => {
  const cwd = process.cwd()
  const dtsFile = join(process.cwd(), 'auto-imports.d.ts')
  if (fs.existsSync(dtsFile))
    fs.unlinkSync(dtsFile)
  const ctx = createContext({
    imports: [
      'vue-demi',
      'react',
      'svelte',
      'svelte/animate',
      'svelte/easing',
      'svelte/motion',
      'svelte/store',
      'svelte/transition',
      {
        custom: [
          'customNamed',
          ['default', 'customDefault'],
        ],
        custom2: [
          ['*', 'custom2'],
        ],
        [join(cwd, 'foo.ts')]: ['foo'],
      },
      'vue/macros',
    ],
  })

  expect(await ctx.generateDTS(join(cwd, 'index.d.ts'))).toMatchSnapshot()
})
