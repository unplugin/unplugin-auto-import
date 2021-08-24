import { ImportsMap } from '../types'
import { CommonCompositionAPI } from './vue'

export default <ImportsMap>({
  '@nuxt/composition-api': [
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
