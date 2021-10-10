import { Arrayable } from '@antfu/utils'
import { FilterPattern } from '@rollup/pluginutils'
import { PresetName } from './presets'
import { TypePresetName } from './global-types'

/**
 * name => alias
 */
export type ImportNameAlias = [string, string]
/**
 *  name => type parameters:
 *  - `false`: no paremetrized type
 *  - `true`: parametrized type `T`, for example when using `Ref<T>`
 *  - `custom`: parametrized type custom, for example when using `WatchCallback<V, OV>`, use `O, IV`
 */
export type ImportNameTypeAlias = [string, boolean | string]
/**
 * Mapping for ImportNameAlias and ImportNameTypeAlias
 */
export type ImportInfo = {
  module: string
  name: string
  from?: string
  /**
   * Only for types
   */
  parameters?: boolean | string

}

/**
 * Given a identifier name, returns the import path or an importInfo object
 */
export type Resolver = (name: string) => string | ImportInfo | null | undefined | void

/**
 * module, name, alias
 */
export type ImportsMap = Record<string, (string | ImportNameAlias)[]>
/**
 * module, name, type parameters
 */
export type ImportsTypeMap = Record<string, (string | ImportNameTypeAlias)[]>
/**
 * name, meta
 */
export type ImportsFlatMap = Record<string, ImportInfo>

export interface Options {
  /**
   * Preset names or custom imports map
   *
   * @default []
   */
  imports?: Arrayable<ImportsMap | PresetName>

  /**
   * Preset names or custom imports map
   *
   * @default []
   */
  types?: Arrayable<ImportsTypeMap | TypePresetName>

  /**
   * Identifiers to be ignored
   */
  ignore?: (string | RegExp)[]

  /**
   * Pass a custom function to resolve the component importing path from the component name.
   *
   * The component names are always in PascalCase
   */
  resolvers?: Resolver | Resolver[]

  /**
   * Filepath to generate corresponding .d.ts file.
   * Default enabled when `typescript` is installed locally.
   * Set `false` to disable.
   *
   * @default './auto-imports.d.ts'
   */
  dts?: string | boolean

  /**
   * Allow overriding imports sources from multiple presets.
   *
   * @default false
   */
  presetOverriding?: boolean

  /**
   * Rules to include transforming target.
   *
   * @default [/\.[jt]sx?$/, /\.vue\??/]
   */
  include?: FilterPattern

  /**
   * Rules to exclude transforming target.
   *
   * @default [/node_modules/, /\.git/]
   */
  exclude?: FilterPattern

  /**
   * Generate source map.
   *
   * @default false
   */
  sourceMap?: boolean
}

export interface TransformOptions {
  imports: ImportsFlatMap

  types: ImportsFlatMap

  /**
   * Identifiers to be ignored
   */
  ignore?: (string | RegExp)[]

  /**
   * Custom resolvers
   */
  resolvers?: Resolver[]

  /**
   * Generate source map.
   *
   * @default false
   */
  sourceMap?: boolean

  /**
   * Hold the value for dynamic resolved imports, will be mutated during transforming
   */
  resolvedImports?: {
    imports: ImportsFlatMap
    types: ImportsFlatMap
  }
}

export interface ResolvedOptions extends Omit<Required<Options>, 'imports' | 'types' | 'resolvers' | 'dts' | 'include' | 'exclude'>, Required<TransformOptions> {
  idFilter: (id: string) => boolean
  dts: string | false
}

export { PresetName }
