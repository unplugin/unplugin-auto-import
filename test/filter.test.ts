import { describe, expect, it } from 'vitest'
import { createContext, INCLUDE_RE_LIST } from '../src/core/ctx'

describe('filter and INCLUDE_RE_LIST', () => {
  it('default INCLUDE_RE_LIST regex matches standard and queried file paths', () => {
    const [tsRe] = INCLUDE_RE_LIST
    expect(tsRe.test('src/index.ts')).toBe(true)
    expect(tsRe.test('src/Component.tsx')).toBe(true)
    expect(tsRe.test('src/utils.js')).toBe(true)
    expect(tsRe.test('src/App.jsx')).toBe(true)

    // Query parameters support (e.g. TanStack Router code-splitting or Vite asset queries)
    expect(tsRe.test('src/routes/index.tsx?tsr-split=component')).toBe(true)
    expect(tsRe.test('src/loader.ts?raw')).toBe(true)
    expect(tsRe.test('src/worker.js?worker')).toBe(true)
    expect(tsRe.test('src/Component.jsx?vue&type=script')).toBe(true)

    // Non-matching file paths
    expect(tsRe.test('src/index.ts.map')).toBe(false)
    expect(tsRe.test('src/data.json')).toBe(false)
    expect(tsRe.test('src/styles.css?inline')).toBe(false)
  })

  it('ctx.filter matches files with query parameters', () => {
    const ctx = createContext()

    expect(ctx.filter('src/routes/index.tsx?tsr-split=component')).toBe(true)
    expect(ctx.filter('src/api/handler.ts?raw')).toBe(true)
    expect(ctx.filter('src/data.json')).toBe(false)
    expect(ctx.filter('/root/node_modules/pkg/index.ts?query=1')).toBe(false)
  })
})
