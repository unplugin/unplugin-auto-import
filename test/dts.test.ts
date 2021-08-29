import { generateDeclration } from '../src/core/dts'
import { resolveOptions } from '../src/core/options'

it('dts', () => {
  const options = resolveOptions({
    imports: [
      'vue-demi',
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

  expect(generateDeclration(options.imports)).toMatchSnapshot()
})
