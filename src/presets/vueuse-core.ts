import { readFileSync } from 'fs'
import { resolveModule } from 'local-pkg'
import type { ImportsMap } from '../types'

let _cache: ImportsMap | undefined

export default (): ImportsMap => {
  const excluded = ['toRefs', 'utils']

  if (!_cache) {
    let indexesJson: any | undefined
    try {
      const corePath = resolveModule('@vueuse/core') || process.cwd()
      const path = resolveModule('@vueuse/core/indexes.json')
        || resolveModule('@vueuse/metadata/index.json')
        || resolveModule('@vueuse/metadata/index.json', { paths: [corePath] })
      indexesJson = JSON.parse(readFileSync(path!, 'utf-8'))
    }
    catch (error) {
      console.error(error)
      throw new Error('[auto-import] failed to load @vueuse/core, have you installed it?')
    }
    if (indexesJson) {
      _cache = {
        '@vueuse/core': indexesJson
          .functions
          .filter((i: any) => ['core', 'shared'].includes(i.package))
          .map((i: any) => i.name as string)
        // only include functions with 4 characters or more
          .filter((i: string) => i && i.length >= 4 && !excluded.includes(i)),
      }
    }
  }

  return _cache || {}
}
