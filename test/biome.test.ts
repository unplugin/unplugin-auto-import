import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import { parse as parseJsonc } from 'jsonc-parser'
import { expect, it } from 'vitest'
import { createContext } from '../src/core/ctx'

it('should update biome.json with dts includes pattern', async () => {
  const tempDir = resolve(__dirname, '.temp-biome-test')
  const biomeConfigPath = resolve(tempDir, 'biome.json')
  const dtsPath = resolve(tempDir, 'auto-imports.d.ts')

  // Create temp directory
  await fs.mkdir(tempDir, { recursive: true })

  try {
    // Create initial biome.json
    const initialConfig = {
      $schema: 'https://biomejs.dev/schemas/2.1.3/schema.json',
      organizeImports: {
        enabled: false,
      },
      linter: {
        enabled: true,
        rules: {
          recommended: true,
        },
      },
    }
    await fs.writeFile(biomeConfigPath, JSON.stringify(initialConfig, null, 2))

    // Create context with biome config update enabled
    const ctx = createContext({
      imports: ['vue'],
      dts: dtsPath,
      biomejs: {
        enabled: true,
      },
    }, tempDir)

    // Generate DTS file
    await ctx.writeConfigFiles()

    // Read updated biome.json
    const updatedContent = await fs.readFile(biomeConfigPath, 'utf-8')
    const updatedConfig = parseJsonc(updatedContent)

    // Verify the includes pattern was added
    expect(updatedConfig.files).toBeDefined()
    expect(updatedConfig.files.includes).toBeDefined()
    expect(updatedConfig.files.includes).toContain('!**/auto-imports.d.ts')

    // Run again to ensure it doesn't duplicate
    await ctx.writeConfigFiles()

    const finalContent = await fs.readFile(biomeConfigPath, 'utf-8')
    const finalConfig = parseJsonc(finalContent)

    // Should still have only one includes pattern
    const includesCount = finalConfig.files.includes.filter((p: string) => p === '!**/auto-imports.d.ts').length
    expect(includesCount).toBe(1)
  }
  finally {
    // Clean up
    await fs.rm(tempDir, { recursive: true, force: true })
  }
})

it('should update biome.jsonc with existing includes patterns', async () => {
  const tempDir = resolve(__dirname, '.temp-biome-test-2')
  const biomeConfigPath = resolve(tempDir, 'biome.jsonc')
  const dtsPath = resolve(tempDir, 'types/auto-imports.d.ts')

  // Create temp directory
  await fs.mkdir(resolve(tempDir, 'types'), { recursive: true })

  try {
    // Create initial biome.jsonc with existing includes patterns
    const initialConfig = `{
  "$schema": "https://biomejs.dev/schemas/2.1.3/schema.json",
  // Some comment
  "files": {
    "includes": ["node_modules", "dist"]
  },
  "linter": {
    "enabled": true
  }
}`
    await fs.writeFile(biomeConfigPath, initialConfig)

    // Create context
    const ctx = createContext({
      imports: ['vue'],
      dts: dtsPath,
      biomejs: {
        enabled: true,
      },
    }, tempDir)

    // Generate DTS file
    await ctx.writeConfigFiles()

    // Read updated biome.jsonc
    const updatedContent = await fs.readFile(biomeConfigPath, 'utf-8')
    const updatedConfig = parseJsonc(updatedContent)

    // Verify the includes pattern was added while preserving existing ones
    expect(updatedConfig.files.includes).toContain('node_modules')
    expect(updatedConfig.files.includes).toContain('dist')
    expect(updatedConfig.files.includes).toContain('!**/auto-imports.d.ts')
    expect(updatedConfig.files.includes.length).toBe(3)
  }
  finally {
    // Clean up
    await fs.rm(tempDir, { recursive: true, force: true })
  }
})

it('should preserve tab indentation in biome config', async () => {
  const tempDir = resolve(__dirname, '.temp-biome-test-tabs')
  const biomeConfigPath = resolve(tempDir, 'biome.json')
  const dtsPath = resolve(tempDir, 'auto-imports.d.ts')

  // Create temp directory
  await fs.mkdir(tempDir, { recursive: true })

  try {
    // Create initial biome.json with tab indentation
    const initialConfig = `{
\t"$schema": "https://biomejs.dev/schemas/2.1.3/schema.json",
\t"linter": {
\t\t"enabled": true
\t}
}`
    await fs.writeFile(biomeConfigPath, initialConfig)

    // Create context
    const ctx = createContext({
      imports: ['vue'],
      dts: dtsPath,
      biomejs: {
        enabled: true,
      },
    }, tempDir)

    // Generate DTS file
    await ctx.writeConfigFiles()

    // Read updated content
    const updatedContent = await fs.readFile(biomeConfigPath, 'utf-8')

    // Verify tabs are preserved
    expect(updatedContent).toContain('\t"files":')
    expect(updatedContent).toContain('\t\t"includes":')

    const updatedConfig = parseJsonc(updatedContent)
    expect(updatedConfig.files.includes).toContain('!**/auto-imports.d.ts')
  }
  finally {
    // Clean up
    await fs.rm(tempDir, { recursive: true, force: true })
  }
})
