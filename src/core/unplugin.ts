import { isPackageExists } from 'local-pkg'
import { minimatch } from 'minimatch'
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
      await ctx.scanDirs()
    },
    async buildEnd() {
      await ctx.writeConfigFiles()
    },
    vite: {
      async config(config) {
        if (options.viteOptimizeDeps === false)
          return

        const exclude = config.optimizeDeps?.exclude || []

        const imports = new Set((await ctx.unimport.getImports()).map(i => i.from)
          .filter(i => i.match(/^[a-z@]/) && !exclude.includes(i) && isPackageExists(i)))

        if (!imports.size)
          return

        return {
          optimizeDeps: {
            include: [...imports],
          },
        }
      },
      async handleHotUpdate({ file }) {
        if (ctx.dirs?.some(glob => minimatch(slash(file), slash(glob))))
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
