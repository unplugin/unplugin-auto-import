import { promises as fs } from 'fs'
import { createUnplugin } from 'unplugin'
import { throttle } from '@antfu/utils'
import type { Options } from './types'
import { resolveOptions } from './core/options'
import { transform } from './core/transform'
import { generateDeclaration } from './core/dts'
import { generateESLintConfigs } from './core/eslintrc'

export default createUnplugin<Options>((options) => {
  let resolved = resolveOptions(options)

  if (!Object.keys(resolved.imports).length && !resolved.resolvers.length)
    console.warn('[auto-import] plugin installed but no imports has defined, see https://github.com/antfu/unplugin-auto-import#configurations for configurations')

  const generateConfigFiles = throttle(500, false, () => {
    if (resolved.dts)
      fs.writeFile(resolved.dts, generateDeclaration(resolved.imports, resolved.resolvedImports), 'utf-8')

    const { eslintrc } = resolved
    if (eslintrc.enabled && eslintrc.filepath)
      fs.writeFile(eslintrc.filepath, generateESLintConfigs(resolved.imports, resolved.resolvedImports, eslintrc), 'utf-8')
  })

  return {
    name: 'unplugin-auto-import',
    enforce: 'post',
    transformInclude(id) {
      return resolved.idFilter(id)
    },
    async transform(code, id) {
      const res = await transform(code, id, resolved)
      if (res)
        generateConfigFiles()

      return res
    },
    vite: {
      configResolved(config: any) {
        resolved = resolveOptions(options, config.root)
        generateConfigFiles()
      },
    },
  }
})
