import { toArray } from '@antfu/utils'
import { } from 'eslint/index'
import { presets } from './presets'
import type { Options } from './types'

type globalsPropValue = boolean | 'readonly' | 'readable' | 'writable' | 'writeable'

function AutoImportESLintGlobals(imports: Options['imports'], propValue: globalsPropValue = true) {
  const globals: { [name: string]: globalsPropValue } = {}
  toArray(imports).forEach((definition) => {
    if (typeof definition === 'string') {
      if (!presets[definition])
        throw new Error(`[auto-import] preset ${definition} not found`)
      const preset = presets[definition]
      definition = typeof preset === 'function' ? preset() : preset
    }

    for (const mod of Object.keys(definition)) {
      definition[mod].forEach((key) => {
        const importName = Array.isArray(key) ? key[1] : key
        globals[importName] = propValue
      })
    }
  })

  return globals
}

export default AutoImportESLintGlobals
