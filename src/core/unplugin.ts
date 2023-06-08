import { relative } from 'node:path'
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
      async handleHotUpdate({ file }) {
        const isShouldUpdate = ctx.dirs?.some((glob) => {
          const file_ = slash(file)
          const glob_ = slash(glob)

          return minimatch(file_, glob_) || relative(file_, glob_) === '..'
        })
        if (isShouldUpdate)
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
