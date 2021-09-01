import MagicString from 'magic-string'
import { ImportInfo, TransformOptions, ComponentResolver } from '../types'

const excludeRE = [
  // imported from other module
  /\bimport\s*([\w_$]*?),?\s*\{([\s\S]*?)\}\s*from\b/g,
  // defined as function
  /\bfunction\s*([\s\S]+?)\s*\(/g,
  // defined as local variable
  /\b(?:const|let|var)\s*([\w\d_$]+?)\b/g,
]

const multilineCommentsRE = /\/\*(.|[\r\n])*?\*\//gm
const singlelineCommentsRE = /\/\/.*/g

function stripeComments(code: string) {
  return code
    .replace(multilineCommentsRE, '')
    .replace(singlelineCommentsRE, '')
}

export function transform(code: string, id: string, { matchRE, imports, sourceMap, resolvers }: TransformOptions) {
  const noComments = stripeComments(code)
  const matched = new Set(Array.from(noComments.matchAll(matchRE)).map(i => i[1]))

  // extends matched results with resolvers. If found some match add the import info to the imports object
  if (resolvers.length > 0) {
    const matches = noComments.matchAll(/\b(\w+)\b/g)
    const firstNonNullResult = (array: Array<ComponentResolver>, name: string) => {
      for (let i = 0; i < array.length; i++) {
        const res = array[i](name)
        if (res) return res
      }
    }
    let match = matches.next()
    while (!match.done) {
      const token = match.value[1]
      const resolved = firstNonNullResult(resolvers, token)
      if (resolved) {
        const componentName = token
        const importInfo = typeof resolved === 'string' ? { from: 'default', name: componentName, module: resolved } : resolved
        imports[componentName] = importInfo
        matched.add(componentName)
      }
      match = matches.next()
    }
  }

  // nothing matched, skip
  if (!matched.size)
    return null

  // remove those already defined
  for (const regex of excludeRE) {
    Array.from(noComments.matchAll(regex))
      .flatMap(i => [...(i[1]?.split(',') || []), ...(i[2]?.split(',') || [])])
      .forEach(i => matched.delete(i.trim()))
  }

  // nothing matched, skip
  if (!matched.size)
    return null

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
    map: sourceMap ? s.generateMap() : null,
  }
}
