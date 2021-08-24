# unplugin-auto-import

[![NPM version](https://img.shields.io/npm/v/unplugin-auto-import?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-auto-import)

Auto import APIs on-demand for Vite, Webpack and Rollup. With TypeScript supports. Powered by [unplugin](https://github.com/unjs/unplugin).

```html
<script setup>
const count = ref(0)
const doubled = computed(() => count.value * 2)
</script> 
```

to

```html
<script setup>
import { ref, computed } from 'vue'
const count = ref(0)
const doubled = computed(() => count.value * 2)
</script> 
```

---

```tsx
export function Counter() {
  const [count, setCount] = useState(0)
  return <div>{ count }</div>
}
```

to

```tsx
import { useState } from 'react'
export function Counter() {
  const [count, setCount] = useState(0)
  return <div>{ count }</div>
}
```

...and so on.

## Install

```bash
npm i unplugin-auto-import -D
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import AutoImport from 'unplugin-auto-import/rollup'

export default {
  plugins: [
    AutoImport({ /* options */ }),
    // other plugins
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-auto-import/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-auto-import/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>



## Configuration

```ts
AutoImport({
  // targets to transform
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue\??/, // .vue
  ],

  // global imports to register
  imports: [
    // presets
    'vue',
    'vue-router',
    // custom
    {
      '@vueuse/core': [
        'useMouse'
      ],
      '[package-name]': [
        '[import-names]',
        // alias
        ['[from]', '[alias]']
      ]
    }
  ],
})
```

Refer to the [type definitions](./src/types.ts) for more options.

## Presets

See [src/presets](./src/presets).

## FAQ

### Compare to [`vue-global-api`](https://github.com/antfu/vue-global-api)

You can think this plugin as a successor of `vue-global-api`, which offers much more flexibility and it's no longer bound to Vue exclusively. Now you can use it with any libraries you want (e.g. React).

###### Pros

- Flexible and customizable
- Tree-shakable (on-demand transforming)
- No global population

###### Cons

- Relying on build tools integrations (while `vue-global-api` is pure runtime) - but hey, we have supported quite a few of them already!

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021 [Anthony Fu](https://github.com/antfu)
