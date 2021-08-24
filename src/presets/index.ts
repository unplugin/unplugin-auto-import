import { PresetName, ImportsMap } from '../types'
import react from './react'
import vue from './vue'
import vueDemi from './vue-demi'
import vueI18n from './vue-i18n'
import vueRouter from './vue-router'
import vue2 from './vue2'

export const presets: Record<PresetName, ImportsMap> = {
  vue,
  react,
  '@vue/composition-api': vue2,
  'vue-demi': vueDemi,
  'vue-router': vueRouter,
  'vue-i18n': vueI18n,
}
