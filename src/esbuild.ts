import type { Options } from './types'
import unplugin from '.'

// TODO: some upstream lib failed generate invalid dts, remove the any in the future
export default unplugin.esbuild as (options?: Options) => any
