import { toArray } from '@antfu/utils'
import type { Addon, Import } from 'unimport'
import type { ImportExtended, ImportLegacy, Resolver, ResolverResult } from '../types'

export function normalizeImport(info: Import | ResolverResult | ImportExtended | ImportLegacy | string, name: string): ImportExtended {
  if (typeof info === 'string') {
    return {
      name: 'default',
      as: name,
      from: info,
    }
  }
  if ('path' in info) {
    return {
      from: info.path,
      as: info.name,
      name: info.importName!,
      sideEffects: info.sideEffects,
    }
  }
  return {
    name,
    as: name,
    ...info,
  }
}

export async function firstMatchedResolver(resolvers: Resolver[], fullname: string) {
  let name = fullname
  for (const resolver of resolvers) {
    if (typeof resolver === 'object' && resolver.type === 'directive') {
      if (name.startsWith('v'))
        name = name.slice(1)
      else
        continue
    }
    const resolved = await (typeof resolver === 'function' ? resolver(name) : resolver.resolve(name))
    if (resolved)
      return normalizeImport(resolved, fullname)
  }
}

export function resolversAddon(resolvers: Resolver[]): Addon {
  return {
    async matchImports(names, matched) {
      if (!resolvers.length)
        return
      const dynamic: ImportExtended[] = []
      const sideEffects: ImportExtended[] = []
      await Promise.all([...names].map(async(name) => {
        if (matched.find(i => i.as === name))
          return
        const resolved = await firstMatchedResolver(resolvers, name)
        if (resolved)
          dynamic.push(resolved)

        if (resolved?.sideEffects)
          sideEffects.push(...toArray(resolved?.sideEffects).map(i => normalizeImport(i, '')))
      }))

      if (dynamic.length) {
        this.dynamicImports.push(...dynamic)
        this.invalidate()
      }

      if (dynamic.length || sideEffects.length)
        return [...matched, ...dynamic, ...sideEffects]
    },
  }
}
