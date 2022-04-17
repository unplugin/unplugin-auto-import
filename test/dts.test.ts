import { generateDeclaration } from '../src/core/dts'
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
        custom2: [
          ['*', 'custom2'],
        ],
        dayjs: [
          ['default', 'dayjs'],
        ],
      },
      'vue/macros',
    ],
  })

  expect(generateDeclaration(options.imports, {})).toMatchSnapshot()
})
