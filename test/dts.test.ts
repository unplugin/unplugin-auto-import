import { join } from 'node:path'
import process from 'node:process'
import { expect, it } from 'vitest'
import { createContext } from '../src/core/ctx'

it('dts', async () => {
  const cwd = process.cwd()
  const ctx = createContext({
    packagePresets: ['magic-string'],
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
