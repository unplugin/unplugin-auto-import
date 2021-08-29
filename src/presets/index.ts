import { ImportsMap } from '../types'
import preact from './preact'
import react from './react'
import svelte from './svelte'
import svelteAnimate from './svelte-animate'
import svelteEasing from './svelte-easing'
import svelteMotion from './svelte-motion'
import svelteStore from './svelte-store'
import svelteTransition from './svelte-transition'
import vue from './vue'
import vueDemi from './vue-demi'
import vueI18n from './vue-i18n'
import vueRouter from './vue-router'
import vueCompositionApi from './vue-composition-api'
import vueuseCore from './vueuse-core'
import vueuseHead from './vueuse-head'
import nuxtCompositionApi from './nuxt-composition-api'

export type PresetName =
  | '@nuxtjs/composition-api'
  | '@vue/composition-api'
  | '@vueuse/core'
  | '@vueuse/head'
  | 'preact'
  | 'react'
  | 'svelte/animate'
  | 'svelte/easing'
  | 'svelte/motion'
  | 'svelte/store'
  | 'svelte'
  | 'svelte/transition'
  | 'vue-demi'
  | 'vue-i18n'
  | 'vue-router'
  | 'vue'

export const presets: Record<PresetName, ImportsMap | (() => ImportsMap)> = {
  '@nuxtjs/composition-api': nuxtCompositionApi,
  '@vue/composition-api': vueCompositionApi,
  '@vueuse/core': vueuseCore,
  '@vueuse/head': vueuseHead,
  preact,
  react,
  'svelte/animate': svelteAnimate,
  'svelte/easing': svelteEasing,
  'svelte/motion': svelteMotion,
  'svelte/store': svelteStore,
  'svelte/transition': svelteTransition,
  svelte,
  'vue-demi': vueDemi,
  'vue-i18n': vueI18n,
  'vue-router': vueRouter,
  vue,
}
