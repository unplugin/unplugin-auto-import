import type { ImportsMap } from '../types'

let _cache: ImportsMap | undefined

export default async (): Promise<ImportsMap> => {
  if (!_cache) {
    try {
      // @ts-expect-error maybe missing
      const mdiNames = await import('@mdi/js').then(m => m.default || m)
      _cache = {
        '@mdi/js': Object.keys(mdiNames),
      }
    }
    catch (error) {
      console.error(error)
      throw new Error('[auto-import] failed to load @mdi/js, have you installed it?')
    }
  }

  return _cache || {}
}
