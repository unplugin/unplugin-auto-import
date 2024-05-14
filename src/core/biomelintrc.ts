import type { Import } from 'unimport'

export function generateBiomeLintConfigs(
  imports: Import[],
) {
  const names
    = imports
      .map(i => i.as ?? i.name)
      .filter(Boolean)
      .sort()

  const config = { javascript: { globals: names } }
  const jsonBody = JSON.stringify(config, null, 2)

  return jsonBody
}
