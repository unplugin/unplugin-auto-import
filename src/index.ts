import { promises as fs } from 'fs'
import { createUnplugin } from 'unplugin'
import { Options } from './types'
import { resolveOptions } from './core/options'
import { transform } from './core/transform'
import { generateDeclration } from './core/dts'

export default createUnplugin<Options>((options) => {
  const resolved = resolveOptions(options)

  if (!Object.keys(resolved.imports).length)
    console.warn('[auto-import] plugin installed but no imports has defined, see https://github.com/antfu/unplugin-auto-import#configurations for configurations')

  if (resolved.dts)
    fs.writeFile(resolved.dts, generateDeclration(resolved.imports), 'utf-8')

  return {
    name: 'unplugin-auto-import',
    enforce: 'post',
    transformInclude(id) {
      return resolved.idFilter(id)
    },
    transform(code, id) {
      const res = transform(code, id, resolved)
      // TODO: avoid rewrite the declaration for every file
      if (resolved.dts)
        fs.writeFile(resolved.dts, generateDeclration(resolved.imports), 'utf-8')
      return res
    },
  }
})
