import { resolve } from 'path'
import { toArray } from '@antfu/utils'
import { createFilter } from '@rollup/pluginutils'
import { presets } from '../presets'
import { ImportInfo, ImportsFlatMap, Options, ResolvedOptions } from '../types'

export function resolveOptions(options: Options = {}): ResolvedOptions {
  const imports = flattenImportsMap(options.imports)
  const resolved: ResolvedOptions = {
    ...options,
    dts: options.dts === false
      ? false
      : resolve(options.dts || 'auto-imports.d.ts'),
    imports,
    matchRE: new RegExp(`\\b(${Object.keys(imports).join('|')})\\b`, 'g'),
    idFilter: createFilter(
      options.include || [/\.[jt]sx?$/, /\.vue\??/],
      options.exclude || [/node_modules/, /\.git/],
    ),
  }

  return resolved
}

export function flattenImportsMap(map: Options['imports']): ImportsFlatMap {
  const flat: ImportsFlatMap = {}
  toArray(map).forEach((definition) => {
    if (typeof definition === 'string') {
      if (!presets[definition])
        throw new Error(`[global-import] preset ${definition} not found`)
      definition = presets[definition]
    }

    for (const mod of Object.keys(definition)) {
      for (const id of definition[mod]) {
        const meta = {
          module: mod,
        } as ImportInfo
        if (Array.isArray(id)) {
          meta.name = id[1]
          meta.from = id[0]
        }
        else {
          meta.name = id
        }

        if (flat[meta.name])
          throw new Error(`[global-import] identifier ${meta.name} already defined with ${flat[meta.name].module}`)

        flat[meta.name] = meta
      }
    }
  })

  return flat
}
