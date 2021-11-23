import { readFileSync } from 'fs'
import { resolveModule } from 'local-pkg'
import { ImportsMap } from '../types'

let _cache: ImportsMap | undefined

export default (): ImportsMap => {
  const excluded = ['toRefs', 'utils']

  if (!_cache) {
    try {
      const path = resolveModule('@vueuse/core/indexes.json')
      const indexesJson = JSON.parse(readFileSync(path!, 'utf-8'))
      _cache = {
        '@vueuse/core': indexesJson
          .functions
          .filter((i: any) => ['core', 'shared'].includes(i.package))
          .map((i: any) => i.name as string)
          // only include functions with 4 characters or more
          .filter((i: string) => i && i.length >= 4 && !excluded.includes(i)),
      }
    }
    catch (error) {
      console.error(error)
      throw new Error('[auto-import] failed to load @vueuse/core, have you installed it?')
    }
  }
  return _cache || {}
}
