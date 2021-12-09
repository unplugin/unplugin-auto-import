import { resolve } from 'path'
import { promises as fs } from 'fs'
import fg from 'fast-glob'
import { resolveOptions } from '../src/core/options'
import { transform } from '../src/core/transform'

describe('transform', async() => {
  const options = resolveOptions({
    imports: [
      'vue',
      'pinia',
      'quasar',
      'react',
      'svelte',
      'svelte/animate',
      'svelte/easing',
      'svelte/motion',
      'svelte/store',
      'svelte/transition',
      {
        'custom': [
          'customNamed',
          ['default', 'customDefault'],
        ],
        'ignored': [
          'ignored',
        ],
        'vue-dollar': [
          '$',
        ],
        'three.js': [
          ['*', 'THREE'],
        ],
      },
    ],
    ignore: [
      'ignored',
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
            path: `custom/resolved/${name.slice('customNamedResolved'.length)}`,
            importName: `_${name}`,
          }
          : null
      },
    ],
  })

  const root = resolve(__dirname, 'fixtures')
  const files = await fg('*', {
    cwd: root,
    onlyFiles: true,
  })

  for (const file of files) {
    it(file, async() => {
      const fixture = await fs.readFile(resolve(root, file), 'utf-8')
      const pass1 = (await transform(fixture, file, options))?.code ?? fixture
      expect(pass1).toMatchSnapshot()
      const pass2 = (await transform(pass1, file, options))?.code ?? pass1
      expect(pass2).toBe(pass1)
    })
  }
})
