/* eslint-disable object-shorthand */
import vue from './vue'
import vueCompositionApi from './vue-composition-api'
import vueDemi from './vue-demi'

export const globalTypes = {
  '@vue/composition-api': vueCompositionApi,
  'vue': vue,
  'vue-demi': vueDemi,
}

export type TypePresetName = keyof typeof globalTypes
