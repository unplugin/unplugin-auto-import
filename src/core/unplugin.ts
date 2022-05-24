import { createUnplugin } from 'unplugin'
import type { Options } from '../types'
import { createContext } from './ctx'

export default createUnplugin<Options>((options) => {
  let ctx = createContext(options)

  if (!Object.keys(ctx.unimport.getImports()).length && !ctx.resolvers.length)
    console.warn('[auto-import] plugin installed but no imports has defined, see https://github.com/antfu/unplugin-auto-import#configurations for configurations')

  return {
    name: 'unplugin-auto-import',
    enforce: 'post',
    transformInclude(id) {
      return ctx.idFilter(id)
    },
    async transform(code, id) {
      return ctx.transform(code, id)
    },
    async buildStart() {
      await ctx.scanDirs()
    },
    vite: {
      async configResolved(config: any) {
        ctx = createContext(options, config.root)
        await ctx.scanDirs()
      },
    },
  }
})
