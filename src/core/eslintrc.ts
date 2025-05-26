import type { Import } from 'unimport'
import type { ESLintrc } from '../types'

export function generateESLintConfigs(
  imports: Import[],
  eslintrc: ESLintrc,
) {
  const eslintConfigs: any = { globals: {} }

  imports
    .map(i => i.as ?? i.name)
    .filter(Boolean)
    .sort()
    .forEach((name) => {
      eslintConfigs.globals[name] = eslintrc.globalsPropValue
    })
  const jsonBody = JSON.stringify(eslintConfigs, null, 2)
  return jsonBody
}
