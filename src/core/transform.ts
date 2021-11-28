import MagicString from 'magic-string'
import { ImportInfo, TransformOptions, Resolver } from '../types'

const excludeRE = [
  // imported from other module
  /\bimport\s*([\s\S]+?)\s*from\b/g,
  // defined as function
  /\bfunction\s*([\w_$]+?)\s*\(/g,
  // defined as local variable
  /\b(?:const|let|var)\s+?(\[[\s\S]*?\]|\{[\s\S]*?\}|[\s\S]+?)\s*?[=;\n]/g,
]

const matchRE = /(?<![\w_$]\.)([\w_$]+?)[^\w_${]/g
const importAsRE = /^.*\sas\s+/
const seperatorRE = /[,[\]{}\n]/g
const multilineCommentsRE = /\/\*\s(.|[\r\n])*?\*\//gm
const singlelineCommentsRE = /\/\/\s.*/g
const templateLiteralRE = /\$\{(.*)\}/g
const quotesRE = [
  /(["'])((?:\\\1|(?!\1)|.|\r)*?)\1/gm,
  /([`])((?:\\\1|(?!\1)|.|\n|\r)*?)\1/gm,
]

function stripeCommentsAndStrings(code: string) {
  return code
    .replace(multilineCommentsRE, '')
    .replace(singlelineCommentsRE, '')
    .replace(templateLiteralRE, '` + $1 + `')
    .replace(quotesRE[0], '""')
    .replace(quotesRE[1], '``')
}

export async function transform(
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
      .flatMap(i => [
        ...(i[1]?.split(seperatorRE) || []),
        ...(i[2]?.split(seperatorRE) || []),
      ])
      .map(i => i.replace(importAsRE, '').trim())
      .forEach(i => identifiers.delete(i))
  }

  // nothing matched, skip
  if (!identifiers.size)
    return null

  const modules: Record<string, ImportInfo[]> = {}
  const addToModules = (info: ImportInfo) => {
    if (!modules[info.path]) modules[info.path] = [info]
    else modules[info.path].push(info)
  }

  // group by module name
  for (const name of Array.from(identifiers)) {
    let info = getOwn(resolvedImports, name) || getOwn(imports, name)

    if (!info && resolvers?.length) {
      const resolved = await firstMatchedResolver(resolvers, name)
      if (resolved) {
        if (typeof resolved === 'string') {
          info = {
            path: resolved,
            importName: 'default',
          }
        }
        else {
          info = resolved
        }
        resolvedImports[name] = info
      }
    }

    if (!info || !info.path)
      continue

    addToModules({
      path: info.path,
      importName: info.importName,
      name,
    })

    if (info.sideEffects) {
      const infos = [info.sideEffects].flat(1).map((info): ImportInfo => {
        if (typeof info === 'string')
          return { path: info }
        return info
      })
      infos.forEach(info => addToModules(info))
    }
  }

  if (!Object.keys(modules).length)
    return

  // stringify import
  const importStatements = Object.entries(modules)
    .map(([moduleName, infos]) => {
      const imports: string[] = []
      const namedImports: string[] = []

      infos
        .forEach(({ name, importName }) => {
          if (name) {
            if (importName === '*')
              imports.push(`* as ${name}`)
            else if (importName === 'default')
              imports.push(name)
            else
              namedImports.push((importName && name !== importName) ? `${importName} as ${name}` : name)
          }
        })

      if (namedImports.length)
        imports.push(`{ ${namedImports.join(', ')} }`)

      return `import ${imports.length > 0 ? `${imports.join(', ')} from ` : ''}'${moduleName}';`
    })
    .join('')

  const s = new MagicString(code)
  s.prependLeft(0, importStatements)

  return {
    code: s.toString(),
    map: sourceMap
      ? s.generateMap({ source: id, includeContent: true })
      : null,
  }
}

async function firstMatchedResolver(resolvers: Resolver[], name: string) {
  for (const resolver of resolvers) {
    if (typeof resolver === 'object' && resolver.type === 'directive') {
      if (name.startsWith('v'))
        name = name.replace('v', '')
      else
        continue
    }
    const resolved = await (typeof resolver === 'function' ? resolver(name) : resolver.resolve(name))
    if (resolved)
      return resolved
  }
}

const hasOwnProperty = Object.prototype.hasOwnProperty

function getOwn<T, K extends keyof T>(object: T, key: K) {
  return hasOwnProperty.call(object, key) ? object[key] : undefined
}
