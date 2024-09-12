import type { PackageIndexes } from '@vueuse/metadata'
import type { ImportsMap } from '../types'
import { readFileSync } from 'node:fs'
import process from 'node:process'
import { resolveModule } from 'local-pkg'

let _cache: ImportsMap | undefined

export default (): ImportsMap => {
  const excluded = ['toRefs', 'utils', 'toRef', 'toValue']

  if (!_cache) {
    let indexesJson: PackageIndexes | undefined
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
          .filter(i => ['core', 'shared'].includes(i.package))
          .flatMap(i => [i.name, ...i.alias || []])
          // only include functions with 4 characters or more
          .filter((i: string) => i && i.length >= 4 && !excluded.includes(i)),
      }
    }
  }

  return _cache || {}
}
