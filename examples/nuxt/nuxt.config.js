export default {
  buildModules: [
    // we disable the type check and left it to `vue-tsc`
    ['@nuxt/typescript-build', { typeCheck: false }],
    // @vue/composition-api support
    '@nuxtjs/composition-api/module',
    // api auto import
    ['unplugin-auto-import/nuxt', { imports: ['@nuxtjs/composition-api'] }],
  ],
}
