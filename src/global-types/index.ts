/* eslint-disable object-shorthand */
import pinia from './pinia'
import vue from './vue'
import vueCompositionApi from './vue-composition-api'
import vueDemi from './vue-demi'

export const globalTypes = {
  'pinia': pinia,
  '@vue/composition-api': vueCompositionApi,
  'vue': vue,
  'vue-demi': vueDemi,
}

export type TypePresetName = keyof typeof globalTypes
