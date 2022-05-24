import type { Import } from 'unimport'
import type { ESLintGlobalsPropValue, ESLintrc } from '../types'

interface ESLintConfigs {
  globals: Record<string, ESLintGlobalsPropValue>
}

export function generateESLintConfigs(
  imports: Import[],
  eslintrc: ESLintrc,
) {
  const eslintConfigs: ESLintConfigs = { globals: {} }

  imports
    .map(i => i.as || i.name)
    .sort()
    .forEach((name) => {
      eslintConfigs.globals[name] = eslintrc.globalsPropValue || true
    })
  const jsonBody = JSON.stringify(eslintConfigs, null, 2)
  return jsonBody
}
