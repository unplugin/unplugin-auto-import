import type { ImportsMap } from '../types'

export const CommonRouterAPI = [
  'useRouter',
  'useRoute',
  'useLink',
  'onBeforeRouteUpdate',
  'onBeforeRouteLeave',
]

export default <ImportsMap>{
  'vue-router': CommonRouterAPI,
}
