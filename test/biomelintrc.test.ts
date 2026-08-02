import { existsSync } from 'node:fs'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, it } from 'vitest'
import { createContext } from '../src/core/ctx'

it('does not generate Biome config when disabled', async () => {
  const root = await mkdtemp(join(tmpdir(), 'unplugin-auto-import-'))
  const output = join(root, '.biomelintrc-auto-import.json')

  try {
    const ctx = createContext({
      dts: false,
      imports: [{ custom: ['foo'] }],
      biomelintrc: { enabled: false, filepath: output },
    }, root)

    await ctx.writeConfigFiles()

    expect(existsSync(output)).toBe(false)
  }
  finally {
    await rm(root, { recursive: true, force: true })
  }
})
