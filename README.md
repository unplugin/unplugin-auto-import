# unplugin-auto-import

[![NPM version](https://img.shields.io/npm/v/unplugin-auto-import?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-auto-import)

Auto import APIs on-demand for Vite, Webpack, Rollup and esbuild. With TypeScript support. Powered by [unplugin](https://github.com/unjs/unplugin).

---

without

```ts
import { computed, ref } from 'vue'
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

with

```ts
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

---

without

```tsx
import { useState } from 'react'
export function Counter() {
  const [count, setCount] = useState(0)
  return <div>{ count }</div>
}
```

with

```tsx
export function Counter() {
  const [count, setCount] = useState(0)
  return <div>{ count }</div>
}
```

## Install

```bash
npm i -D unplugin-auto-import
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
    require('unplugin-auto-import/webpack')({ /* options */ }),
  ],
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

<details>
<summary>Quasar</summary><br>

```ts
// quasar.conf.js
const AutoImportPlugin = require('unplugin-auto-import/webpack')

module.exports = {
  build: {
    chainWebpack(chain) {
      chain.plugin('unplugin-auto-import').use(
        AutoImportPlugin({ /* options */ }),
      )
    },
  },
}
```

<br></details>


<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'

build({
  /* ... */
  plugins: [
    require('unplugin-auto-import/esbuild')({
      /* options */
    }),
  ],
})
```

<br></details>

## Configuration

```ts
AutoImport({
  // targets to transform
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/, /\.vue\?vue/, // .vue
    /\.md$/, // .md
  ],

  // global imports to register
  imports: [
    // presets
    'vue',
    'vue-router',
    // custom
    {
      '@vueuse/core': [
        // named imports
        'useMouse', // import { useMouse } from '@vueuse/core',
        // alias
        ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
      ],
      'axios': [
        // default imports
        ['default', 'axios'], // import { default as axios } from 'axios',
      ],
      '[package-name]': [
        '[import-names]',
        // alias
        ['[from]', '[alias]'],
      ],
    },
  ],

  // Generate corresponding .eslintrc-auto-import.json file.
  // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
  eslintrc: {
    enabled: false, // Default `false`
    filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
    globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
  },

  // custom resolvers
  // see https://github.com/antfu/unplugin-auto-import/pull/23/
  resolvers: [
    /* ... */
  ],

  // Filepath to generate corresponding .d.ts file.
  // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
  // Set `false` to disable.
  dts: './auto-imports.d.ts',
})
```

Refer to the [type definitions](./src/types.ts) for more options.

## Presets

See [src/presets](./src/presets).

## ESLint - eslint(no-undef)

Configure `options.eslintrc`, and modify your eslint configuration file.

Example:

```ts
// .eslintrc.js

module.exports = {
  /* ... */
  extends: [
    // ...
    './.eslintrc-auto-import.json',
  ],
}
```

ESLint Docs: [Extending Configuration Files](https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files)

> Note: `.eslintrc-auto-import.json` is generated automatically, If the configuration file changes do not take effect in time, please check the configuration file, restart eslint server or the editor

## TypeScript

In order to properly hint types for auto-imported APIs, make sure:

- to configure `options.dts` so that `auto-imports.d.ts` file is automatically generated
- to include `auto-imports.d.ts` in `tsconfig.json`

## FAQ

### Compare to [`vue-global-api`](https://github.com/antfu/vue-global-api)

You can think of this plugin as a successor to `vue-global-api`, but offering much more flexibility and bindings with libraries other than Vue (e.g. React).

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
