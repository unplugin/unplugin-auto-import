import type { Import } from 'unimport'
import type { ESLintGlobalsPropValue, ESLintrc } from '../types'

export function generateESLintConfigs(
  imports: Import[],
  eslintrc: ESLintrc,
  globals: Record<string, ESLintGlobalsPropValue> = {},
) {
  const eslintConfigs = { globals }

  imports
    .map(i => i.as ?? i.name)
    .filter(Boolean)
    .sort()
    .forEach((name) => {
      eslintConfigs.globals[name] = eslintrc.globalsPropValue || true
    })
  const jsonBody = JSON.stringify(eslintConfigs, null, 2)
  return jsonBody
}
