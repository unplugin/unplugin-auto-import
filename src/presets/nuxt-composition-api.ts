import { ImportsMap } from '../types'
import { CommonCompositionAPI } from './vue'

export default <ImportsMap>({
  '@nuxtjs/composition-api': [
    ...CommonCompositionAPI,

    // nuxt hooks
    'onGlobalSetup',
    'useFetch',
    'useAsync',
    'useContext',
    'ssrRef',
    'shallowSsrRef',
    'ssrPromise',
    'useMeta',
    'useStore',
    'useRouter',
    'useRoute',
  ],
})
