import { ImportsMap } from '../types'

let _cache: ImportsMap | undefined

export default (): ImportsMap => {
  if (!_cache) {
    try {
      /* eslint-disable @typescript-eslint/no-var-requires */
      const indexesJson = require('@vueuse/core/indexes.json')
      _cache = {
        '@vueuse/core': indexesJson
          .functions
          .filter((i: any) => ['core', 'shared'].includes(i.package))
          .map((i: any) => i.name as string)
          // only include functions with 4 characters or more
          .filter((i: string) => i && i.length >= 4),
      }
    }
    catch (error) {
      throw new Error('[auto-import] failed to load @vueuse/core, have you installed it?')
    }
  }
  return _cache || {}
}
