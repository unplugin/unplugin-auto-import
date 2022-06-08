import fs from 'fs'
import path from 'path'
import { resolveModule } from 'local-pkg'
import type { ImportNameAlias, ImportsMap } from '../types'

const reservedKeywords = [
  'abstract',
  'arguments',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'enum',
  'eval',
  'export',
  'extends',
  'false',
  'final',
  'finally',
  'float',
  'for',
  'function',
  'goto',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'int',
  'interface',
  'let',
  'long',
  'native',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'short',
  'static',
  'super',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'volatile',
  'while',
  'with',
  'yield,',
  'Array',
  'Date',
  'eval',
  'function',
  'hasOwnProperty',
  'Infinity',
  'isFinite',
  'isNaN',
  'isPrototypeOf',
  'length',
  'Math',
  'NaN',
  'name',
  'Number',
  'Object',
  'prototype',
  'String',
  'toString',
  'undefined',
  'valueOf',
  'alert',
  'all',
  'anchor',
  'anchors',
  'area',
  'assign',
  'blur',
  'button',
  'checkbox',
  'clearInterval',
  'clearTimeout',
  'clientInformation',
  'close',
  'closed',
  'confirm',
  'constructor',
  'crypto',
  'decodeURI',
  'decodeURIComponent',
  'defaultStatus',
  'document',
  'element',
  'elements',
  'embed',
  'embeds',
  'encodeURI',
  'encodeURIComponent',
  'escape',
  'event',
  'fileUpload',
  'focus',
  'form',
  'forms',
  'frame',
  'innerHeight',
  'innerWidth',
  'layer',
  'layers',
  'link',
  'location',
  'mimeTypes',
  'navigate',
  'navigator',
  'frames',
  'frameRate',
  'hidden',
  'history',
  'image',
  'images',
  'offscreenBuffering',
  'open',
  'opener',
  'option',
  'outerHeight',
  'outerWidth',
  'packages',
  'pageXOffset',
  'pageYOffset',
  'parent',
  'parseFloat',
  'parseInt',
  'password',
  'pkcs11',
  'plugin',
  'prompt',
  'propertyIsEnum',
  'radio',
  'reset',
  'screenX',
  'screenY',
  'scroll',
  'secure',
  'select',
  'self',
  'setInterval',
  'setTimeout',
  'status',
  'submit',
  'taint',
  'text',
  'textarea',
  'top',
  'unescape',
  'untaint',
  'window',
  'onblur',
  'onclick',
  'onerror',
  'onfocus',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onmouseover',
  'onload',
  'onmouseup',
  'onmousedown',
  'onsubmit',
]

let _cache: ImportsMap | undefined

function generateApis() {
  const exclude = [
    'fail', 'success', 'complete', 'reject', 'resolve',
    ...reservedKeywords,
  ]
  const conflicts: Record<string, string> = {
    nextTick: 'taroNextTick',
  }

  const dir = resolveModule('@tarojs/taro')
  if (!dir) {
    console.error('\n[auto-import] Not found package `@tarojs/taro`, have you installed it?')
    console.error('see more https://github.com/NervJS/taro')
    return
  }

  try {
    const typesDir = `${path.dirname(dir) + path.sep}types`
    let maps: Array<string | ImportNameAlias> = []

    const filesList: string[] = readFiles(typesDir)

    for (const file of filesList) {
      if (file.includes('taro.extend.d.ts'))
        continue

      const pContent = fs.readFileSync(file, 'utf-8')
      const match = pContent.match(/(interface TaroStatic \{(.|\n)*\})/) || []
      const content = match[0]
      const reg = /(?<=\s{4})(?<name>\w+)(?=(\s?\()|\<)/g

      if (!content)
        continue

      const funcs: Array<string | [string, string]> = (content.match(reg) || [])
        .filter(fun => !exclude.includes(fun))
        .map((fun: string) => conflicts[fun] ? [fun, conflicts[fun]] : fun)

      maps = maps.concat(funcs)
    }

    maps = [
      'getEnv',
      ['getCurrentInstance', 'taroGetCurrentInstance'],
      ...Array.from(new Set(maps)),
    ] as ImportNameAlias[]

    return maps
  }
  catch (err: any) {
    console.error(
      'Some errors have occurred, '
      + 'please report an issue at https://github.com/antfu/unplugin-auto-import/issues/new?'
       + `title=${encodeURIComponent('[Taro] Failed generate apis')}&body=${encodeURIComponent(err?.message)}`,
    )
    console.error(err)
  }
}

function readFiles(dir: string, filesList: string[] = []) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.resolve(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory())
      readFiles(filePath, filesList)

    else
      filesList.push(filePath)
  }

  return filesList
}

export default function (): ImportsMap {
  if (!_cache) {
    _cache = {
      '@tarojs/taro': generateApis() || [],
    }
  }

  return _cache || {}
}

