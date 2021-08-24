import { ImportsMap } from '../types'
import preact from './preact'
import react from './react'
import vue from './vue'
import vueDemi from './vue-demi'
import vueI18n from './vue-i18n'
import vueRouter from './vue-router'
import vueCompositionApi from './vue-composition-api'
import vueuseCore from './vueuse-core'
import vueuseHead from './vueuse-head'
import nuxtCompositionApi from './nuxt-composition-api'

export type PresetName =
  | '@nuxt/composition-api'
  | '@vue/composition-api'
  | '@vueuse/core'
  | '@vueuse/head'
  | 'preact'
  | 'react'
  | 'vue-demi'
  | 'vue-i18n'
  | 'vue-router'
  | 'vue'

export const presets: Record<PresetName, ImportsMap | (() => ImportsMap)> = {
  '@nuxt/composition-api': nuxtCompositionApi,
  '@vue/composition-api': vueCompositionApi,
  '@vueuse/core': vueuseCore,
  '@vueuse/head': vueuseHead,
  'vue-demi': vueDemi,
  'vue-i18n': vueI18n,
  'vue-router': vueRouter,
  preact,
  react,
  vue,
}
