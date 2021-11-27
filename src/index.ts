import { promises as fs } from 'fs'
import { createUnplugin } from 'unplugin'
import { Arrayable, throttle } from '@antfu/utils'
import { ComponentResolver } from 'unplugin-vue-components/types'
import { Resolver, Options } from './types'
import { resolveOptions } from './core/options'
import { transform } from './core/transform'
import { generateDeclaration as _generateDeclaration } from './core/dts'

export const componentResolver = (resolvers: Arrayable<ComponentResolver>): Resolver => async(name) => {
  for (const resolver of [resolvers].flat(1)) {
    if (typeof resolver === 'object' && resolver.type === 'directive') {
      if (name.startsWith('v'))
        name = name.replace('v', '')
      else
        return
    }
    const resolved = await (typeof resolver === 'function' ? resolver(name) : resolver.resolve(name))
    if (resolved)
      return resolved
  }
  return null
}

export default createUnplugin<Options>((options) => {
  const resolved = resolveOptions(options)

  if (!Object.keys(resolved.imports).length && !resolved.resolvers.length)
    console.warn('[auto-import] plugin installed but no imports has defined, see https://github.com/antfu/unplugin-auto-import#configurations for configurations')

  const generateDeclaration = throttle(500, false, () => {
    if (!resolved.dts) return
    fs.writeFile(resolved.dts, _generateDeclaration(resolved.imports, resolved.resolvedImports), 'utf-8')
  })

  generateDeclaration()

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
  }
})
