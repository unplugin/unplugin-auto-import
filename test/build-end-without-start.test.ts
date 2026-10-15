import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, it } from 'vitest'
import AutoImport from '../src/vite'

it('scans dirs before writing config files when buildEnd fires without buildStart', async () => {
  const root = await mkdtemp(join(tmpdir(), 'unplugin-auto-import-'))
  const dts = join(root, 'auto-imports.d.ts')

  try {
    const plugin = AutoImport({ dirs: ['examples/vite-react/src/views'], dts }) as any

    await plugin.buildEnd()

    const content = await readFile(dts, 'utf8')
    expect(content).toContain('PageA')
    expect(content).toContain('TypeA')
  }
  finally {
    await rm(root, { recursive: true, force: true })
  }
})
