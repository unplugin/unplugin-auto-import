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
      dirsScanOptions: { types: true },
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
      dirsScanOptions: { types: true },
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
      dirsScanOptions: { types: true },
      dirs: [
        'src/types',
        {
          glob: 'src/views',
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

describe('dirsScanOptions', () => {
  it('should filePatterns work', async () => {
    const ctx = createContext({
      dts: false,
      dirsScanOptions: {
        filePatterns: ['*.{ts,tsx}'],
      },
      dirs: [
        'src/views',
        'src/types',
      ],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('PageA')
    expect(data).toContain('PageB')
    expect(data).not.toContain('TypeA')
    expect(data).not.toContain('TypeB')
    expect(data).not.toContain('SpecialType')
  })

  it('should specific filePatterns work', async () => {
    const ctx = createContext({
      dts: false,
      dirsScanOptions: {
        types: true,
        filePatterns: ['*.ts'],
      },
      dirs: ['src/views', 'src/types'],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).not.toContain('PageA')
    expect(data).not.toContain('PageB')
    expect(data).toContain('TypeA')
    expect(data).toContain('TypeB')
    expect(data).toContain('SpecialType')
  })

  it('should fileFilter work', async () => {
    const ctx = createContext({
      dts: false,
      dirsScanOptions: {
        types: true,
        fileFilter: (file: string) => file.includes('TypeA') || file.includes('PageA'),
      },
      dirs: ['src/views', 'src/types'],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('TypeA')
    expect(data).toContain('PageA')
    expect(data).not.toContain('TypeB')
    expect(data).not.toContain('PageB')
    expect(data).not.toContain('SpecialType')
  })

  it('should fileFilter work when excluding all', async () => {
    const ctx = createContext({
      dts: false,
      dirsScanOptions: {
        types: true,
        fileFilter: (_file: string) => false,
      },
      dirs: ['src/views', 'src/types'],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).not.toContain('TypeA')
    expect(data).not.toContain('PageA')
    expect(data).not.toContain('TypeB')
    expect(data).not.toContain('PageB')
    expect(data).not.toContain('SpecialType')
  })

  it('should filePatterns and fileFilter work together', async () => {
    const ctx = createContext({
      dts: false,
      dirsScanOptions: {
        types: true,
        filePatterns: ['*.{ts,tsx}'],
        fileFilter: (file: string) => file.includes('PageA') || file.includes('SpecialType'),
      },
      dirs: ['src/views', 'src/types'],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('PageA')
    expect(data).toContain('SpecialType')
    expect(data).not.toContain('PageB')
    expect(data).not.toContain('TypeA')
    expect(data).not.toContain('TypeB')
  })
})
