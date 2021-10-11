/* eslint-disable object-shorthand */
import pinia from './pinia'
import {
  svelteAnimate,
  svelteMotion,
  svelteStore,
  svelteTransition,
} from './svelte'
import vue from './vue'
import vueCompositionApi from './vue-composition-api'
import vueDemi from './vue-demi'
import vuex from './vuex'

export const globalTypes = {
  '@vue/composition-api': vueCompositionApi,
  'pinia': pinia,
  'svelte/animate': svelteAnimate,
  'svelte/motion': svelteMotion,
  'svelte/store': svelteStore,
  'svelte/transition': svelteTransition,
  'vue': vue,
  'vue-demi': vueDemi,
  'vuex': vuex,
}

export type TypePresetName = keyof typeof globalTypes
