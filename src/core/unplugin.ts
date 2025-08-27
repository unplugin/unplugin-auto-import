import type { FilterPattern } from 'unplugin'
import type { Options } from '../types'
import { slash } from '@antfu/utils'
import { isPackageExists } from 'local-pkg'
import pm from 'picomatch'
import { createUnplugin } from 'unplugin'
import { createContext, EXCLUDE_RE_LIST, INCLUDE_RE_LIST } from './ctx'

export default createUnplugin<Options>((options) => {
  let ctx = createContext(options)
  return {
    name: 'unplugin-auto-import',
    enforce: 'post',
    transformInclude(id) {
      return ctx.filter(id)
    },
    transform: {
      filter: {
        id: {
          include: options.include as FilterPattern || INCLUDE_RE_LIST,
          exclude: options.exclude as FilterPattern || EXCLUDE_RE_LIST,
        },
      },
      async handler(code, id) {
        return ctx.transform(code, id)
      },
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

        const imports = new Set((await ctx.unimport.getImports()).map(i => i.from).filter(i => i.match(/^[a-z@]/) && !exclude.includes(i) && isPackageExists(i)))

        if (!imports.size)
          return

        return {
          optimizeDeps: {
            include: [...imports],
          },
        }
      },
      async handleHotUpdate({ file }) {
        if (!ctx.dirs?.length)
          return

        if (ctx.configFilePaths.includes(file))
          return

        const normalizedFilePath = slash(file)

        const shouldRescan = ctx.normalizedDirPaths.some(dirPath =>
          pm.isMatch(normalizedFilePath, dirPath.glob),
        )

        if (shouldRescan)
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
