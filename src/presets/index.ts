import { ImportsMap } from '../types'
import preact from './preact'
import react from './react'
import vue from './vue'
import vueDemi from './vue-demi'
import vueI18n from './vue-i18n'
import vueRouter from './vue-router'
import vue2 from './vue2'

export type PresetName =
  | 'vue'
  | '@vue/composition-api'
  | 'vue-demi'
  | 'vue-router'
  | 'vue-i18n'
  | 'react'
  | 'preact'

export const presets: Record<PresetName, ImportsMap> = {
  vue,
  react,
  preact,
  '@vue/composition-api': vue2,
  'vue-demi': vueDemi,
  'vue-router': vueRouter,
  'vue-i18n': vueI18n,
}
