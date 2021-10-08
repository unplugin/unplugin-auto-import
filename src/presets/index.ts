/* eslint-disable object-shorthand */
import nuxtCompositionApi from './nuxt-composition-api'
import preact from './preact'
import quasar from './quasar'
import react from './react'
import {
  svelte,
  svelteAnimate,
  svelteEasing,
  svelteMotion,
  svelteStore,
  svelteTransition,
} from './svelte'
import vitepress from './vitepress'
import vue from './vue'
import vueDemi from './vue-demi'
import vueI18n from './vue-i18n'
import vueRouter from './vue-router'
import vueCompositionApi from './vue-composition-api'
import vueuseCore from './vueuse-core'
import vueuseHead from './vueuse-head'

export const presets = {
  '@nuxtjs/composition-api': nuxtCompositionApi,
  '@vue/composition-api': vueCompositionApi,
  '@vueuse/core': vueuseCore,
  '@vueuse/head': vueuseHead,
  'preact': preact,
  'quasar': quasar,
  'react': react,
  'svelte': svelte,
  'svelte/animate': svelteAnimate,
  'svelte/easing': svelteEasing,
  'svelte/motion': svelteMotion,
  'svelte/store': svelteStore,
  'svelte/transition': svelteTransition,
  'vitepress': vitepress,
  'vue-demi': vueDemi,
  'vue-i18n': vueI18n,
  'vue-router': vueRouter,
  'vue': vue,
}

export type PresetName = keyof typeof presets
