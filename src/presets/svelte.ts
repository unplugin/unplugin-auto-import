import { ImportsMap } from '../types'

export const SvelteStoreAPI = [
  'writable',
  'readable',
  'derived',
  'get',
]

export const SvelteMotionAPI = [
  'tweened',
  'spring',
]

export const SvelteTransitionAPI = [
  'fade',
  'blur',
  'blur',
  'fly',
  'slide',
  'scale',
  'draw',
  'crossfade',
]

export const SvelteAnimateAPI = [
  'flip',
]

export const SvelteEasingAPI = [
  'back',
  'bounce',
  'circ',
  'cubic',
  'elastic',
  'expo',
  'quad',
  'quart',
  'quint',
  'sine',
].reduce((acc, e) => {
  acc.push(`${e}In`, `${e}Out`, `${e}InOut`)
  return acc
}, ['linear'])

export default <ImportsMap>({
  'svelte': [
    // lifecycle
    'onMount',
    'beforeUpdate',
    'afterUpdate',
    'onDestroy',
    // tick
    'tick',
    // context
    'setContext',
    'getContext',
    'hasContext',
    'getAllContexts',
    // event dispatcher
    'createEventDispatcher',
  ],
  'svelte/animate': SvelteAnimateAPI,
  'svelte/easing': SvelteEasingAPI,
  'svelte/motion': SvelteMotionAPI,
  'svelte/store': SvelteStoreAPI,
  'svelte/transition': SvelteTransitionAPI,
})
