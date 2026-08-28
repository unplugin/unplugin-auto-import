import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { slash } from '@antfu/utils'
import { afterEach, describe, expect, it } from 'vitest'
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

describe('dirsScanOptions', () => {
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
    expect(data).toContain('TypeA')
    expect(data).toContain('TypeB')
    expect(data).toContain('SpecialType')
  })

  it('should specific filePatterns work', async () => {
    const ctx = createContext({
      dts: false,
      dirsScanOptions: {
        types: true,
        filePatterns: ['*.ts'],
      },
      dirs: [
        'src/views',
        'src/types',
      ],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).not.toContain('PageA')
    expect(data).not.toContain('PageB')
    expect(data).not.toContain('TypeA')
    expect(data).not.toContain('TypeB')
    expect(data).toContain('SpecialType')
  })

  it('should fileFilter work', async () => {
    const ctx = createContext({
      dts: false,
      dirsScanOptions: {
        types: true,
        fileFilter: (file: string) => file.includes('TypeA') || file.includes('PageA'),
      },
      dirs: [
        'src/views',
        'src/types',
      ],
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
      dirs: [
        'src/views',
        'src/types',
      ],
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
        fileFilter: (file: string) => file.includes('PageA'),
      },
      dirs: [
        'src/views',
        'src/types',
      ],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('PageA')
    expect(data).toContain('TypeA')
    expect(data).not.toContain('SpecialType')
    expect(data).not.toContain('PageB')
    expect(data).not.toContain('TypeB')
  })
})

describe('scan dirs with special characters in the project path', () => {
  const temps: string[] = []

  afterEach(async () => {
    await Promise.all(temps.splice(0).map(dir => rm(dir, { recursive: true, force: true })))
  })

  async function setupProject(folderName: string) {
    const parent = await mkdtemp(join(tmpdir(), 'uai-special-'))
    temps.push(parent)
    const root = join(parent, folderName)
    await mkdir(join(root, 'src', 'composables'), { recursive: true })
    await writeFile(
      join(root, 'src', 'composables', 'useSpecial.ts'),
      'export const useSpecial = () => 1\n',
    )
    return root
  }

  it('should scan dirs when the project path contains parentheses', async () => {
    const root = await setupProject('Code(Template)')
    const ctx = createContext({
      dts: false,
      dirs: ['src/composables'],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('useSpecial')
  })

  it('should match watched files when the project path contains parentheses', async () => {
    const root = await setupProject('Code(Template)')
    const ctx = createContext({
      dts: false,
      dirs: ['src/composables'],
    }, root)
    const file = slash(join(root, 'src', 'composables', 'useSpecial.ts'))

    expect(ctx.normalizedDirMatchers.some(match => match(file))).toBe(true)
  })

  it('should scan dirs when the project path contains brackets', async () => {
    const root = await setupProject('Code[Template]')
    const ctx = createContext({
      dts: false,
      dirs: ['src/composables'],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('useSpecial')
  })

  it('should keep character classes in a user-supplied dirs pattern working', async () => {
    // Only the resolved root prefix is escaped, so glob syntax the user wrote
    // themselves must still behave as a glob.
    const root = await setupProject('plain')
    await mkdir(join(root, 'src', 'b'), { recursive: true })
    await writeFile(join(root, 'src', 'b', 'useB.ts'), 'export const useB = () => 2\n')
    await mkdir(join(root, 'src', 'z'), { recursive: true })
    await writeFile(join(root, 'src', 'z', 'useZ.ts'), 'export const useZ = () => 3\n')

    const ctx = createContext({
      dts: false,
      dirs: ['src/[bz]'],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('useB')
    expect(data).toContain('useZ')
  })

  it('should keep a user-supplied pattern working under a path with parentheses', async () => {
    const root = await setupProject('Code(Template)')
    await mkdir(join(root, 'src', 'b'), { recursive: true })
    await writeFile(join(root, 'src', 'b', 'useB.ts'), 'export const useB = () => 2\n')

    const ctx = createContext({
      dts: false,
      dirs: ['src/[b]'],
    }, root)

    await ctx.scanDirs()
    const data = await ctx.generateDTS('')
    expect(data).toContain('useB')
  })
})
