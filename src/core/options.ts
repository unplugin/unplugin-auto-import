import { resolve } from 'path'
import { toArray } from '@antfu/utils'
import { createFilter } from '@rollup/pluginutils'
import { isPackageExists } from 'local-pkg'
import { presets } from '../presets'
import { globalTypes } from '../global-types'
import { ImportInfo, ImportsFlatMap, ImportsMap, ImportsTypeMap, Options, ResolvedOptions } from '../types'

export function resolveOptions(options: Options = {}): ResolvedOptions {
  const imports = flattenImportsMap(true, options)
  const types = flattenImportsMap(false, options)

  const {
    dts = isPackageExists('typescript'),
  } = options

  const resolved: ResolvedOptions = {
    sourceMap: false,
    resolvedImports: {
      imports: {},
      types: {},
    },
    presetOverriding: false,
    ignore: [],
    ...options,
    dts: dts === false
      ? false
      : dts === true
        ? resolve('auto-imports.d.ts')
        : resolve(dts),
    imports,
    types,
    resolvers: toArray(options.resolvers),
    idFilter: createFilter(
      options.include || [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/],
      options.exclude || [/node_modules/, /\.git/],
    ),
  }

  return resolved
}

export function flattenImportsMap(usePreset: boolean, options: Options = {}): ImportsFlatMap {
  const flat: ImportsFlatMap = {}
  const {
    imports = {},
    types = {},
    presetOverriding = false,
  } = options
  const resolvedPreset: Record<string, ImportsMap | ImportsTypeMap> = usePreset ? presets : globalTypes

  toArray(usePreset ? imports : types).forEach((definition) => {
    // noinspection SuspiciousTypeOfGuard
    if (typeof definition === 'string') {
      if (!resolvedPreset[definition])
        throw new Error(`[auto-import] preset ${definition} not found`)
      const preset = resolvedPreset[definition]
      // @ts-ignore
      definition = typeof preset === 'function' ? resolvedPreset() : preset
    }

    for (const mod of Object.keys(definition)) {
      // @ts-ignore
      for (const id of definition[mod]) {
        const meta = {
          module: mod,
        } as ImportInfo
        if (Array.isArray(id)) {
          if (usePreset) {
            meta.name = id[1]
            meta.from = id[0]
          }
          else {
            if (id.length > 2) {
              meta.name = id[2]
              meta.from = id[1]
            }
            else {
              meta.name = id[1]
            }
            meta.parameters = id[0]
          }
        }
        else {
          meta.name = id
        }

        if (flat[meta.name] && !presetOverriding)
          throw new Error(`[auto-import] identifier ${meta.name} already defined with ${flat[meta.name].module}`)

        flat[meta.name] = meta
      }
    }
  })

  return flat
}
