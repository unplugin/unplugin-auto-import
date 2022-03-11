import type { ImportsMap } from '../types'

export default <ImportsMap>({
  'vue-marcos': [
    // https://vuejs.org/guide/extras/reactivity-transform.html#refs-vs-reactive-variables
    '$',
    '$$',
    '$ref',
    '$shallowRef',
    '$toRef',
    '$customRef',
    '$computed',
  ],
})
