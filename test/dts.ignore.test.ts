import { join } from 'node:path'
import { expect, it } from 'vitest'
import { createContext } from '../src/core/ctx'

it('dts', async () => {
  const cwd = process.cwd()
  const ctx = createContext({
    imports: [{
      custom: [
        'shouldBePresent',
        'shouldAlsoBePresent',
        'shouldBeIgnored',
        'ignoreme_shoudAlsoBeIgnored'
      ]
    }],
    ignoreDts: [
      'shouldBeIgnored',
      /^ignoreme_/
    ]
  })

  const dtsContent = await ctx.generateDTS(join(cwd, 'index.d.ts'))

  expect(dtsContent).toContain('shouldBePresent')
  expect(dtsContent).toContain('shouldAlsoBePresent')
  expect(dtsContent).not.toContain('shouldBeIgnored')
  expect(dtsContent).not.toContain('ignoreme_shoudAlsoBeIgnored')
})
