import { dirname } from 'path'
import { fileURLToPath } from 'url'
import resolve from 'resolve'
import { ImportsMap } from '../types'

let _cache: ImportsMap | undefined

export default (): ImportsMap => {
  const excluded = ['toRefs', 'utils']

  if (!_cache) {
    try {
      const _dirname = typeof __dirname !== 'undefined'
        ? __dirname
        : dirname(fileURLToPath(
          // @ts-ignore
          import.meta.url,
        ))
      const path = resolve.sync('@vueuse/core/indexes.json', { paths: [process.cwd(), _dirname] })
      // eslint-disable-next-line @typescript-eslint/no-var-requires
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
