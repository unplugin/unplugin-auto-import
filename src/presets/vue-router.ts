import type { ImportsMap } from '../types'

export default <ImportsMap>({
  'vue-router': [
    'createRouter',
    'createWebHistory',
    'createMemoryHistory',
    'createRouterMatcher',
    'createWebHashHistory',

    // composition api
    'useRouter',
    'useRoute',
    'useLink',
    'onBeforeRouteLeave',
    'onBeforeRouteUpdate'
  ],
})
