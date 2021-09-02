import { resolve } from 'path'
import { promises as fs } from 'fs'
import fg from 'fast-glob'
import { transform } from '../src/core/transform'
import { resolveOptions } from '../src/core/options'

describe('transform', () => {
  const options = resolveOptions({
    imports: [
      'vue',
      'react',
      'svelte',
      'svelte/animate',
      'svelte/easing',
      'svelte/motion',
      'svelte/store',
      'svelte/transition',
      {
        custom: [
          'customNamed',
          ['default', 'customDefault'],
        ],
      },
    ],
    resolvers: [
      (name) => {
        return name.startsWith('customResolved')
          ? `custom/resolved/${name.slice('customResolved'.length)}`
          : null
      },
      (name) => {
        return name.startsWith('customNamedResolved')
          ? {
            module: `custom/resolved/${name.slice('customNamedResolved'.length)}`,
            name,
            from: `_${name}`,
          }
          : null
      },
    ],
  })

  describe('fixtures', () => {
    const root = resolve(__dirname, 'fixtures')
    const files = fg.sync('*', {
      cwd: root,
      onlyFiles: true,
    })

    for (const file of files) {
      it(file, async() => {
        const fixture = await fs.readFile(resolve(root, file), 'utf-8')
        expect(transform(fixture, file, options)?.code ?? fixture).toMatchSnapshot()
      })
    }
  })
})
