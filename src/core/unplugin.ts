import minimatch from 'minimatch'
import { slash } from '@antfu/utils'
import { createUnplugin } from 'unplugin'
import type { Options } from '../types'
import { createContext } from './ctx'

export default createUnplugin<Options>((options) => {
  let ctx = createContext(options)
  return {
    name: 'unplugin-auto-import',
    enforce: 'post',
    transformInclude(id) {
      return ctx.filter(id)
    },
    async transform(code, id) {
      return ctx.transform(code, id)
    },
    async buildStart() {
      await Promise.all([
        ctx.scanDirs(),
        ctx.updateCacheImports(),
      ])
      await ctx.writeConfigFiles()
    },
    async buildEnd() {
      await ctx.writeConfigFiles()
    },
    vite: {
      async handleHotUpdate({ file }) {
        if (ctx.dirs?.some(glob => minimatch(slash(file), glob)))
          await ctx.scanDirs()
      },
      async configResolved(config) {
        if (ctx.root !== config.root) {
          ctx = createContext(options, config.root)
          await ctx.scanDirs()
        }
      },
    },
  }
})
