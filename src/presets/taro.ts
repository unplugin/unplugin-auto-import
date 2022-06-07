import fs from 'fs'
import path from 'path'
import { resolveModule } from 'local-pkg'
import type { ImportsMap } from '../types'

interface TaroResolverOptions {
  /**
   * 是否包含全部API
   */
  isFull?: boolean
  /**
   * 需要被排除的API
   */
  exclude?: string[]
  /**
   * 处理存在冲突的API
   * @example
   * ```
   * { nextTick: 'taroNextTick' }
   * // output: ['nextTick', 'taroNextTick']
   * ```
   */
  conflicts?: Record<string, string>
}

let _cache: ImportsMap | undefined

function generateApis(options: TaroResolverOptions = {}): string[] {
  const exclude = ['new', ...(options.exclude || [])]
  const conflicts = Object.assign({
    nextTick: 'taroNextTick',
    getCurrentInstance: 'taroGetCurrentInstance',
  }, (options.conflicts || {}))
  const isFull = options.isFull || false

  const dir = resolveModule('@tarojs/taro')
  if (!dir) {
    console.error('\n[auto-import] Not found package `@tarojs/taro`, have you installed it?')
    console.error('see more https://github.com/NervJS/taro')
    return []
  }

  try {
    const typesDir = `${path.dirname(dir) + path.sep}types`
    let maps: string[] = []

    const filesList: string[] = readFiles(typesDir)

    for (const file of filesList) {
      const pContent = fs.readFileSync(file, 'utf-8')
      const match = pContent.match(/(interface TaroStatic \{(.|\n)*\})/) || []
      const content = match[0]
      const reg = /(?<name>\w+)(?=\s?\(.*?\)\:)/g

      if (
        !content
        || (!isFull && !file.includes('taro.hooks.d.ts'))
      )
        continue

      const funcs: Array<string | [string, string]> = (content.match(reg) || [])
        .filter(fun => !exclude.includes(fun))
        .map((fun: string) => conflicts[fun] ? [fun, conflicts[fun]] : fun)

      maps = maps.concat(...funcs)
    }

    return Array.from(new Set(maps))
  }
  catch (err: any) {
    console.error(`Some errors have occurred, please report an issue at https://github.com/antfu/unplugin-auto-import/issues/new?title=${encodeURIComponent('[Taro] Failed generate apis')}&body=${encodeURIComponent(err?.message)}`)
    console.error(err)
    return []
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

export default function (options: TaroResolverOptions = {}): ImportsMap {
  if (!_cache) {
    _cache = {
      '@tarojs/taro': generateApis(options),
    }
  }

  return _cache || {}
}
