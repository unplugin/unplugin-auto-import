import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const defaultNS = 'ns'
export const resources = {
  en: {
    [defaultNS]: {
      welcome: 'Welcome to React',
    },
  },
} as const

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    defaultNS,
    resources,

    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })
