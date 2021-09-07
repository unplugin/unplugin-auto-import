import { ImportsMap } from '../types'

let _cache: ImportsMap | undefined

export default (): ImportsMap => {
  const excluded = ['toRefs', 'utils']

  if (!_cache) {
    try {
      /* eslint-disable @typescript-eslint/no-var-requires */
      const path = require.resolve('@vueuse/core/indexes.json', { paths: [process.cwd(), __dirname] })
      const indexesJson = require(path)
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
