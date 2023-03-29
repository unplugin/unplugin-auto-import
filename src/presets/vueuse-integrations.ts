import { readFileSync } from 'node:fs'
import { resolveModule } from 'local-pkg'
import type { ImportsMap } from '../types'

let _cache: ImportsMap | undefined

export default (): ImportsMap => {
  if (!_cache) {
    let indexesJson
    try {
      const path = resolveModule('@vueuse/integrations/package.json')
      indexesJson = JSON.parse(readFileSync(path!, 'utf-8'))
    }
    catch (error) {
      console.error(error)
      throw new Error('[auto-import] failed to load @vueuse/integrations, have you installed it?')
    }
    if (indexesJson) {
      const funcMap = Object.keys(indexesJson.exports ?? {})
        .map(name => name.match(/[a-zA-Z]+/)?.[0])
        .filter(Boolean)
        .map(name => [`@vueuse/integrations/${name}`, [name]])

      _cache = Object.fromEntries(funcMap)
    }
  }

  return _cache || {}
}
