import { createContext } from '../src/core/ctx'

it('dts', () => {
  const ctx = createContext({
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
      },
      'vue/macros',
    ],
  })

  expect(ctx.unimport.generateTypeDecarations()).toMatchSnapshot()
})
