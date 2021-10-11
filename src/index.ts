import { promises as fs } from 'fs'
import { createUnplugin } from 'unplugin'
import { throttle } from '@antfu/utils'
import { Options } from './types'
import { resolveOptions } from './core/options'
import { transform } from './core/transform'
import { generateDeclration as _generateDeclaration } from './core/dts'
import { pickTypes } from './global-types/pickTypes'

export { pickTypes }

export default createUnplugin<Options>((options) => {
  const resolved = resolveOptions(options)

  if (!Object.keys(resolved.imports).length && !resolved.resolvers.length)
    console.warn('[auto-import] plugin installed but no imports has defined, see https://github.com/antfu/unplugin-auto-import#configurations for configurations')

  const generateDeclaration = throttle(500, false, () => {
    if (!resolved.dts) return
    fs.writeFile(
      resolved.dts,
      _generateDeclaration(
        resolved.imports,
        resolved.types,
        resolved.resolvedImports,
        resolved.resolvedTypes,
      ),
      'utf-8',
    )
  })

  generateDeclaration()

  return {
    name: 'unplugin-auto-import',
    enforce: 'post',
    transformInclude(id) {
      return resolved.idFilter(id)
    },
    transform(code, id) {
      const res = transform(code, id, resolved)
      if (res && resolved.resolvers.length)
        generateDeclaration()
      return res
    },
  }
})
