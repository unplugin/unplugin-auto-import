import { resolve } from 'path'
import { toArray } from '@antfu/utils'
import { createFilter } from '@rollup/pluginutils'
import hasPkg from 'has-pkg'
import { presets } from '../presets'
import { ImportInfo, ImportsFlatMap, Options, ResolvedOptions } from '../types'

export function resolveOptions(options: Options = {}): ResolvedOptions {
  const imports = flattenImportsMap(options.imports, options.presetOverriding)

  const { dts = hasPkg('typescript') } = options
  const resolved: ResolvedOptions = {
    sourceMap: false,
    ...options,
    dts: dts === false
      ? false
      : dts === true
        ? resolve('auto-imports.d.ts')
        : resolve(dts),
    imports,
    matchRE: new RegExp(`\\b(${Object.keys(imports).join('|')})\\b`, 'g'),
    idFilter: createFilter(
      options.include || [/\.[jt]sx?$/, /\.vue\??/],
      options.exclude || [/node_modules/, /\.git/],
    ),
  }

  return resolved
}

export function flattenImportsMap(map: Options['imports'], overriding = false): ImportsFlatMap {
  const flat: ImportsFlatMap = {}
  toArray(map).forEach((definition) => {
    if (typeof definition === 'string') {
      if (!presets[definition])
        throw new Error(`[auto-import] preset ${definition} not found`)
      const preset = presets[definition]
      definition = typeof preset === 'function' ? preset() : preset
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

        if (flat[meta.name] && !overriding)
          throw new Error(`[auto-import] identifier ${meta.name} already defined with ${flat[meta.name].module}`)

        flat[meta.name] = meta
      }
    }
  })

  return flat
}
