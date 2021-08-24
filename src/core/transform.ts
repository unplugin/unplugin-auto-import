import MagicString from 'magic-string'
import { ImportInfo, TransformOptions } from '../types'

const excludeRegex = [
  // imported from other module
  /\bimport\s*\{([\s\S]*?)\}\s*from\b/g,
  // defined as function
  /\bfunction\s*([\s\S]+?)\s*\(/g,
  // defined as local variable
  /\b(?:const|let|var)\s*([\w\d_$]+?)\b/g,
]

export function transform(code: string, id: string, { matchRE, imports }: TransformOptions) {
  const matched = new Set(Array.from(code.matchAll(matchRE)).map(i => i[1]))

  // remove those already defined
  for (const regex of excludeRegex) {
    Array.from(code.matchAll(regex))
      .flatMap(i => i[1]?.split(',') || [])
      .forEach(i => matched.delete(i.trim()))
  }

  const modules: Record<string, ImportInfo[]> = {}

  // group by module name
  Array.from(matched).forEach((name) => {
    const moduleName = imports[name]?.module
    if (!moduleName)
      return
    if (!modules[moduleName])
      modules[moduleName] = []
    modules[moduleName].push(imports[name])
  })

  // stringify import
  const importStatements = Object.entries(modules)
    .map(([moduleName, names]) => {
      const imports = names
        .map(({ name, from }) => from ? `${from} as ${name}` : name)
        .join(', ')
      return `import { ${imports} } from '${moduleName}';`
    })
    .join('')

  const s = new MagicString(code)
  s.prependLeft(0, importStatements)

  return {
    code: s.toString(),
    get map() {
      return s.generateMap()
    },
  }
}
