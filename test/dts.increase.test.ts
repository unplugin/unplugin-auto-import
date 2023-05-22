import { join } from 'node:path'
import { expect, it } from 'vitest'
import { createContext } from '../src/core/ctx'

it('dts', async () => {
  const cwd = process.cwd()
  const dts = join(cwd, './test/tmp/dts.increase.d.ts')
  const ctx = createContext({
    ignore: ['h'],
    imports: ['vue'],
    dts,
  })

  const dtsContent = await ctx.generateDTS(dts)
  expect(dtsContent).toContain('AAA')
  expect(dtsContent).toContain('BBB')
  expect(dtsContent).toContain('$$')
})
