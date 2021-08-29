import { ImportsMap } from '../types'

const SvelteAnimateAPI = [
  'flip',
]

export const svelteAnimate = <ImportsMap>({
  'svelte/animate': SvelteAnimateAPI,
})

const SvelteEasingAPI = [
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

export const svelteEasing = <ImportsMap>({
  'svelte/easing': SvelteEasingAPI,
})

const SvelteStoreAPI = [
  'writable',
  'readable',
  'derived',
  'get',
]

export const svelteStore = <ImportsMap>({
  'svelte/store': SvelteStoreAPI,
})

const SvelteMotionAPI = [
  'tweened',
  'spring',
]

export const svelteMotion = <ImportsMap>({
  'svelte/motion': SvelteMotionAPI,
})

const SvelteTransitionAPI = [
  'fade',
  'blur',
  'blur',
  'fly',
  'slide',
  'scale',
  'draw',
  'crossfade',
]

export const svelteTransition = <ImportsMap>({
  'svelte/transition': SvelteTransitionAPI,
})

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
