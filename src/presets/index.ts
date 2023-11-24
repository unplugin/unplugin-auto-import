import { builtinPresets } from 'unimport'
import ahooks from './ahooks'
import mobx from './mobx'
import mobxReactLite from './mobx-react-lite'
import preact from './preact'
import quasar from './quasar'
import react from './react'
import reactRouter from './react-router'
import reactRouterDom from './react-router-dom'
import reactI18next from './react-i18next'
import {
  svelte,
  svelteAnimate,
  svelteEasing,
  svelteMotion,
  svelteStore,
  svelteTransition,
} from './svelte'
import veeValidate from './vee-validate'
import vitepress from './vitepress'
import vueRouter from './vue-router'
import vueRouterComposables from './vue-router-composables'
import vueuseCore from './vueuse-core'
import vueuseHead from './vueuse-head'
import vuex from './vuex'
import uniApp from './uni-app'
import solid from './solid'
import solidRouter from './solid-router'
import solidAppRouter from './solid-app-router'
import { jotai, jotaiUtils } from './jotai'
import vueuseMath from './vueuse-math'
import recoil from './recoil'
import mdiJs from './mdi-js'

export const presets = {
  ...builtinPresets,
  'ahooks': ahooks,
  '@vueuse/core': vueuseCore,
  '@vueuse/math': vueuseMath,
  '@vueuse/head': vueuseHead,
  'mobx': mobx,
  'mobx-react-lite': mobxReactLite,
  'preact': preact,
  'quasar': quasar,
  'react': react,
  'react-router': reactRouter,
  'react-router-dom': reactRouterDom,
  'react-i18next': reactI18next,
  'svelte': svelte,
  'svelte/animate': svelteAnimate,
  'svelte/easing': svelteEasing,
  'svelte/motion': svelteMotion,
  'svelte/store': svelteStore,
  'svelte/transition': svelteTransition,
  'vee-validate': veeValidate,
  'vitepress': vitepress,
  'vue-router': vueRouter,
  'vue-router/composables': vueRouterComposables,
  'vuex': vuex,
  'uni-app': uniApp,
  'solid-js': solid,
  '@solidjs/router': solidRouter,
  'solid-app-router': solidAppRouter,
  'jotai': jotai,
  'jotai/utils': jotaiUtils,
  'recoil': recoil,
  '@mdi/js': mdiJs,
}

export type PresetName = keyof typeof presets
