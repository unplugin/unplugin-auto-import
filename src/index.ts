import { promises as fs } from 'fs'
import { createUnplugin } from 'unplugin'
import { throttle } from '@antfu/utils'
import type { Options } from './types'
import { resolveOptions } from './core/options'
import { transform } from './core/transform'
import { generateDeclaration as _generateDeclaration } from './core/dts'

export default createUnplugin<Options>((options) => {
  let resolved = resolveOptions(options)

  if (!Object.keys(resolved.imports).length && !resolved.resolvers.length)
    console.warn('[auto-import] plugin installed but no imports has defined, see https://github.com/antfu/unplugin-auto-import#configurations for configurations')

  const generateDeclaration = throttle(500, false, () => {
    if (!resolved.dts) return
    fs.writeFile(resolved.dts, _generateDeclaration(resolved.imports, resolved.resolvedImports), 'utf-8')
  })

  return {
    name: 'unplugin-auto-import',
    enforce: 'post',
    transformInclude(id) {
      return resolved.idFilter(id)
    },
    async transform(code, id) {
      const res = await transform(code, id, resolved)
      if (res && resolved.resolvers.length)
        generateDeclaration()
      return res
    },
    vite: {
      configResolved(config: any) {
        resolved = resolveOptions(options, config.root)
        generateDeclaration()
      },
    },
  }
})
