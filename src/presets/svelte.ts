import { ImportsMap } from '../types'

export const svelteAnimate = <ImportsMap>({
  'svelte/animate': [
    'flip',
  ],
})

export const svelteEasing = <ImportsMap>({
  'svelte/easing': [
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
  }, ['linear']),
})

export const svelteStore = <ImportsMap>({
  'svelte/store': [
    'writable',
    'readable',
    'derived',
    'get',
  ],
})

export const svelteMotion = <ImportsMap>({
  'svelte/motion': [
    'tweened',
    'spring',
  ],
})

export const svelteTransition = <ImportsMap>({
  'svelte/transition': [
    'fade',
    'blur',
    'fly',
    'slide',
    'scale',
    'draw',
    'crossfade',
  ],
})

export const svelte = <ImportsMap>({
  svelte: [
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
})
