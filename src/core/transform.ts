import MagicString from 'magic-string'
import { ImportInfo, TransformOptions, Resolver } from '../types'

const excludeRE = [
  // imported from other module
  /\bimport\s*([\w_$]*?),?\s*\{([\s\S]*?)\}\s*from\b/g,
  // defined as function
  /\bfunction\s*([\s\S]+?)\s*\(/g,
  // defined as local variable
  /\b(?:const|let|var)\s*([\w\d_$]+?)\b/g,
]

const matchRE = /\b(\w+)\b/g
const importAsRE = /^.*\sas\s+/
const multilineCommentsRE = /\/\*(.|[\r\n])*?\*\//gm
const singlelineCommentsRE = /\/\/.*/g

function stripeComments(code: string) {
  return code
    .replace(multilineCommentsRE, '')
    .replace(singlelineCommentsRE, '')
}

export function transform(
  code: string,
  id: string,
  {
    imports,
    sourceMap,
    resolvers,
    resolvedImports = {},
  }: TransformOptions,
) {
  const noComments = stripeComments(code)
  const identifiers = new Set(Array.from(noComments.matchAll(matchRE)).map(i => i[1]))

  // nothing matched, skip
  if (!identifiers.size)
    return null

  // remove those already defined
  for (const regex of excludeRE) {
    Array.from(noComments.matchAll(regex))
      .flatMap(i => [...(i[1]?.split(',') || []), ...(i[2]?.split(',') || [])])
      .map(i => i.replace(importAsRE, '').trim())
      .forEach(i => identifiers.delete(i))
  }

  // nothing matched, skip
  if (!identifiers.size)
    return null

  const modules: Record<string, ImportInfo[]> = {}

  // group by module name
  Array.from(identifiers).forEach((name) => {
    let info: ImportInfo = resolvedImports[name] || imports[name]

    if (!info && resolvers?.length) {
      const resolved = firstNonNullResult(resolvers, name)
      if (resolved) {
        if (typeof resolved === 'string') {
          info = {
            module: resolved,
            name,
            from: 'default',
          }
        }
        else {
          info = resolved
        }
        resolvedImports[name] = info
      }
    }

    if (!info)
      return

    if (!modules[info.module])
      modules[info.module] = []
    modules[info.module].push(info)
  })

  if (!Object.keys(modules).length)
    return

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

function firstNonNullResult(array: Resolver[], name: string) {
  for (let i = 0; i < array.length; i++) {
    const res = array[i](name)
    if (res)
      return res
  }
}
