import type { defaultNS, resources } from './i18n'
import 'react-i18next'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof resources['en']
  }
}
