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
   * Set `false` to disable.
   *
   * @default './global-imports.d.ts'
   */
  dts?: string | false
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
}

export interface TransformOptions {
  imports: ImportsFlatMap
  matchRE: RegExp
}

export interface ResolvedOptions extends Omit<Options, 'imports'>, TransformOptions {
  idFilter: (id: string) => boolean
}

export { PresetName }
