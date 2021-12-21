import { resolve } from 'path'
import { toArray } from '@antfu/utils'
import { createFilter } from '@rollup/pluginutils'
import { isPackageExists } from 'local-pkg'
import { presets } from '../presets'
import type { ImportsFlatMap, Options, ResolvedOptions, ResolvedResult } from '../types'

export function resolveOptions(options: Options = {}): ResolvedOptions {
  const imports = flattenImportsMap(options.imports, options.presetOverriding)

  const {
    dts = isPackageExists('typescript'),
  } = options

  const resolved: ResolvedOptions = {
    sourceMap: false,
    resolvedImports: {},
    presetOverriding: false,
    ignore: [],
    ...options,
    dts: dts === false
      ? false
      : dts === true
        ? resolve('auto-imports.d.ts')
        : resolve(dts),
    imports,
    resolvers: options.resolvers ? [options.resolvers].flat(2) : [],
    idFilter: createFilter(
      options.include || [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/],
      options.exclude || [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
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
        const meta: ResolvedResult = {
          path: mod,
        }
        let name: string
        if (Array.isArray(id)) {
          name = id[1]
          meta.importName = id[0]
        }
        else {
          name = id
          meta.importName = id
        }

        if (flat[name] && !overriding)
          throw new Error(`[auto-import] identifier ${name} already defined with ${flat[name].path}`)

        flat[name] = meta
      }
    }
  })

  return flat
}
