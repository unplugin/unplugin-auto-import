import MagicString from 'magic-string'
import { ImportInfo, TransformOptions, Resolver } from '../types'

const excludeRE = [
  // imported from other module
  /\bimport\s*([\w_$]*?),?\s*(?:\{([\s\S]*?)\})?\s*from\b/g,
  // defined as function
  /\bfunction\s*([\w_$]+?)\s*\(/g,
  // defined as local variable
  /\b(?:const|let|var)\s+?([\s\S]+?)[=\n;]/g,
]

const matchRE = /(?<![\w_$]\.)([\w_$]+)\b/g
const importAsRE = /^.*\sas\s+/
const multilineCommentsRE = /\/\*(.|[\r\n])*?\*\//gm
const singlelineCommentsRE = /\/\/.*/g
const quotesRE = /(["'`])((?:\\\1|(?!\1)|.|\n|\r)*?)\1/gm

function stripeCommentsAndStrings(code: string) {
  return code
    .replace(multilineCommentsRE, '')
    .replace(singlelineCommentsRE, '')
    .replace(quotesRE, '')
}

export function transform(
  code: string,
  id: string,
  {
    imports,
    sourceMap,
    resolvers,
    resolvedImports = {},
    ignore = [],
  }: TransformOptions,
) {
  const striped = stripeCommentsAndStrings(code)
  const identifiers = new Set(Array.from(striped.matchAll(matchRE)).map(i => i[1]))

  ignore.forEach((i) => {
    if (typeof i === 'string') {
      identifiers.delete(i)
    }
    // regex
    else {
      identifiers.forEach((id) => {
        if (id.match(i))
          identifiers.delete(id)
      })
    }
  })

  // nothing matched, skip
  if (!identifiers.size)
    return null

  // remove those already defined
  for (const regex of excludeRE) {
    Array.from(striped.matchAll(regex))
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
    let info = getOwn(resolvedImports, name) || getOwn(imports, name)

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

    if (!info || !info.module)
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

const hasOwnProperty = Object.prototype.hasOwnProperty

function getOwn<T, K extends keyof T>(object: T, key: K) {
  return hasOwnProperty.call(object, key) ? object[key] : undefined
}
