import { builtinPresets } from 'unimport'
import ahooks from './ahooks'
import { jotai, jotaiUtils } from './jotai'
import mobx from './mobx'
import mobxReactLite from './mobx-react-lite'
import preact from './preact'
import quasar from './quasar'
import react from './react'
import reactDom from './react-dom'
import reactI18next from './react-i18next'
import reactRouter from './react-router'
import reactRouterDom from './react-router-dom'
import recoil from './recoil'
import solid from './solid'
import solidAppRouter from './solid-app-router'
import solidRouter from './solid-router'
import {
  svelte,
  svelteAnimate,
  svelteEasing,
  svelteMotion,
  svelteStore,
  svelteTransition,
} from './svelte'
import uniApp from './uni-app'
import veeValidate from './vee-validate'
import vitepress from './vitepress'
import vueRouter from './vue-router'
import vueRouterComposables from './vue-router-composables'
import vueuseCore from './vueuse-core'
import vueuseHead from './vueuse-head'
import vueuseMath from './vueuse-math'
import vuex from './vuex'

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
  'react-dom': reactDom,
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
}

export type PresetName = keyof typeof presets
