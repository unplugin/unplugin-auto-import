export default {
  buildModules: [
    // we disable the type check and left it to `vue-tsc`
    ['@nuxt/typescript-build', { typeCheck: false }],
    // @vue/composition-api support
    '@nuxtjs/composition-api/module',
    // <script setup> transformer
    'unplugin-vue2-script-setup/nuxt',
    // auto import
    ['unplugin-auto-import/nuxt', { imports: ['@vue/composition-api'] }],
  ],
}
