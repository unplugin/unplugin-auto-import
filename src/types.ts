import type { Arrayable, Awaitable } from '@antfu/utils'
import type { FilterPattern } from '@rollup/pluginutils'
import { PresetName } from './presets'

export type ImportNameAlias = [string, string]
export interface ImportInfo {
  path: string
  name?: string
  importName?: string
}
export type SideEffectsInfo = Arrayable<ImportInfo | string> | undefined
export interface ResolvedResult {
  path: string
  importName?: string
  sideEffects?: SideEffectsInfo
}

export type ResolverFunction = (name: string) => Awaitable<string | ResolvedResult | null | undefined | void>

export interface ResolverResultObject {
  type: 'component' | 'directive'
  resolve: ResolverFunction
}

/**
 * Given a identifier name, returns the import path or an importInfo object
 */
export type Resolver = ResolverFunction | ResolverResultObject

/**
 * module, name, alias
 */
export type ImportsMap = Record<string, (string | ImportNameAlias)[]>
/**
 * name, meta
 */
export type ImportsFlatMap = Record<string, ResolvedResult>

export type ESLintGlobalsPropValue = boolean | 'readonly' | 'readable' | 'writable' | 'writeable'

export interface ESLintrc {
  enabled?: boolean // Default enabled when `eslint` is installed locally.
  filepath?: string // Default `./.eslintrc-auto-import.json`
  globalsPropValue?: ESLintGlobalsPropValue // Default `true`
}

export interface Options {
  /**
   * Preset names or custom imports map
   *
   * @default []
   */
  imports?: Arrayable<ImportsMap | PresetName>

  /**
   * Identifiers to be ignored
   */
  ignore?: (string | RegExp)[]

  /**
   * Pass a custom function to resolve the component importing path from the component name.
   *
   * The component names are always in PascalCase
   */
  resolvers?: Arrayable<Arrayable<Resolver>>

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

  /**
   * Generate corresponding .eslintrc-auto-import.json file.
   */
  eslintrc?: ESLintrc
}

export interface TransformOptions {
  imports: ImportsFlatMap

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
  resolvedImports?: ImportsFlatMap
}

export interface ResolvedOptions extends Omit<Required<Options>, 'imports' | 'resolvers' | 'dts' | 'include' | 'exclude' | 'eslintrc'>, Required<TransformOptions> {
  idFilter: (id: string) => boolean
  dts: string | false
  eslintrc: ESLintrc
}

export { PresetName }
