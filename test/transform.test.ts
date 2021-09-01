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
        const pass1 = transform(fixture, file, options)?.code ?? fixture
        expect(pass1).toMatchSnapshot()
        const pass2 = transform(pass1, file, options)?.code ?? pass1
        expect(pass2).toBe(pass1)
      })
    }
  })
})
