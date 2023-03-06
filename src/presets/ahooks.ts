import { readFileSync } from 'node:fs'
import { resolveModule } from 'local-pkg'
import type { PackageIndexes } from '@vueuse/metadata'
import type { ImportsMap } from '../types'

let _cache: ImportsMap | undefined

export default (): ImportsMap => {
  if (!_cache) {
    let indexesJson: PackageIndexes | undefined
    try {
      const path = resolveModule('ahooks/metadata.json')
      indexesJson = JSON.parse(readFileSync(path!, 'utf-8'))
    }
    catch (error) {
      console.error(error)
      throw new Error('[auto-import] failed to load ahooks, have you installed it?')
    }
    if (indexesJson) {
      _cache = {
        ahooks: indexesJson
          .functions
          .flatMap(i => [i.name, ...i.alias || []]),
      }
    }
  }

  return _cache || {}
}
