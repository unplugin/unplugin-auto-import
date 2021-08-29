import { Arrayable } from '@antfu/utils'
import { FilterPattern } from '@rollup/pluginutils'
import { PresetName } from './presets'

export type ImportNameAlias = [string, string]
export type ImportInfo = {
  module: string
  name: string
  from?: string
}

/**
 * module, name, alias
 */
export type ImportsMap = Record<string, (string | ImportNameAlias)[]>
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
  matchRE: RegExp

  /**
   * Generate source map.
   *
   * @default false
   */
  sourceMap?: boolean
}

export interface ResolvedOptions extends Omit<Options, 'imports'>, TransformOptions {
  idFilter: (id: string) => boolean
}

export { PresetName }
