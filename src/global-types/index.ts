/* eslint-disable object-shorthand */
import pinia from './pinia'
import vue from './vue'
import vueCompositionApi from './vue-composition-api'
import vueDemi from './vue-demi'
import vuex from './vuex'

export const globalTypes = {
  'pinia': pinia,
  '@vue/composition-api': vueCompositionApi,
  'vue': vue,
  'vue-demi': vueDemi,
  'vuex': vuex,
}

export type TypePresetName = keyof typeof globalTypes
