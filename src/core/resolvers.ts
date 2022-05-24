import type { Addon, Import } from 'unimport'
import type { ImportExtended, ImportLegacy, Resolver } from '../types'

export function normalizeImport(info: Import | ImportExtended | ImportLegacy | string): ImportExtended | string {
  if (typeof info === 'string')
    return info
  if ('path' in info) {
    return {
      from: info.path,
      as: info.name,
      name: info.importName!,
      sideEffects: info.sideEffects,
    }
  }
  return info
}

export async function firstMatchedResolver(resolvers: Resolver[], name: string) {
  for (const resolver of resolvers) {
    if (typeof resolver === 'object' && resolver.type === 'directive') {
      if (name.startsWith('v'))
        name = name.replace('v', '')
      else
        continue
    }
    const resolved = await (typeof resolver === 'function' ? resolver(name) : resolver.resolve(name))
    if (resolved)
      return normalizeImport(resolved)
  }
}

export function resolversAddon(resolvers: Resolver[]): Addon {
  return {
    async matchImports(names, matched) {
      if (!resolvers.length)
        return
      await Promise.all([...names].map(async(name) => {
        if (matched.find(i => i.as === name))
          return
        const resolved = await firstMatchedResolver(resolvers, name)
        if (resolved) {
          if (typeof resolved === 'string') {
            matched.push({
              as: name,
              from: resolved,
              name: 'default',
            })
          }
          else {
            matched.push({
              as: name,
              ...normalizeImport(resolved) as any,
            })
          }
        }
      }))
    },
  }
}
