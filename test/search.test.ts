import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createContext } from '../src/core/ctx'

const root = resolve(__dirname, '../examples/vite-react')

describe('search', () => {
  it('should dir work', async () => {
    const ctx = createContext({
      dts: false,
      dirs: [
        'src/views',
      ],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('PageA')
    expect(data).toContain('PageB')
  })

  it('should dir exclude work', async () => {
    const ctx = createContext({
      dts: false,
      dirs: [
        'src/**',
        '!src/views',
      ],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).not.toContain('PageA')
    expect(data).not.toContain('PageB')
  })
})

describe('import the types from the dirs', () => {
  it('should import types work', async () => {
    const ctx = createContext({
      dts: false,
      dirs: [
        {
          glob: 'src/views',
          includeTypes: true,
        },
      ],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('TypeA')
  })
})
