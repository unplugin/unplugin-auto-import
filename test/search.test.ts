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
  it('should top level types enable work', async () => {
    const ctx = createContext({
      dts: false,
      types: true,
      dirs: ['src/**'],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('TypeA')
    expect(data).toContain('TypeB')
    expect(data).toContain('SpecialType')
  })

  it('should specific dirs types enable work', async () => {
    const ctx = createContext({
      dts: false,
      types: false,
      dirs: [
        {
          glob: 'src/views',
          types: true,
        },
      ],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('TypeA')
    expect(data).toContain('TypeB')
    expect(data).not.toContain('SpecialType')
  })

  it('should specific dirs types disable work', async () => {
    const ctx = createContext({
      dts: false,
      types: true,
      dirs: [
        'src/**',
        {
          glob: '!src/views',
          types: false,
        },
      ],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).not.toContain('TypeA')
    expect(data).not.toContain('TypeB')
    expect(data).toContain('SpecialType')
  })
})
