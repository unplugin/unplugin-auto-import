import ahooks from './ahooks'
import mobx from './mobx'
import mobxReactLite from './mobx-react-lite'
import nuxtCompositionApi from './nuxt-composition-api'
import pinia from './pinia'
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
import vue from './vue'
import vueDemi from './vue-demi'
import vueI18n from './vue-i18n'
import vueRouter from './vue-router'
import unpluginVueRouter from './@vue-router'
import vueCompositionApi from './vue-composition-api'
import vueuseCore from './vueuse-core'
import vueMacros from './vue-macros'
import vueuseHead from './vueuse-head'
import vuex from './vuex'
import vitest from './vitest'
import uniApp from './uni-app'
import solid from './solid'
import solidRouter from './solid-router'
import solidAppRouter from './solid-app-router'
import { jotai, jotaiUtils } from './jotai'
import vueuseMath from './vueuse-math'
import recoil from './recoil'

export const presets = {
  'ahooks': ahooks,
  '@nuxtjs/composition-api': nuxtCompositionApi,
  '@vue/composition-api': vueCompositionApi,
  '@vueuse/core': vueuseCore,
  '@vueuse/math': vueuseMath,
  '@vueuse/head': vueuseHead,
  'mobx': mobx,
  'mobx-react-lite': mobxReactLite,
  'pinia': pinia,
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
  'vue-demi': vueDemi,
  'vue-i18n': vueI18n,
  '@vue-router': unpluginVueRouter,
  'vue-router': vueRouter,
  'vue': vue,
  'vue/macros': vueMacros,
  'vuex': vuex,
  'vitest': vitest,
  'uni-app': uniApp,
  'solid-js': solid,
  '@solidjs/router': solidRouter,
  'solid-app-router': solidAppRouter,
  'jotai': jotai,
  'jotai/utils': jotaiUtils,
  'recoil': recoil,
}

export type PresetName = keyof typeof presets
