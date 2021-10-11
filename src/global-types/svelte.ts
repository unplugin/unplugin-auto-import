import { ImportsTypeMap } from '../types'

export const svelteAnimate = <ImportsTypeMap>({
  'svelte/animate': [
    'AnimationConfig',
  ],
})

export const svelteStore = <ImportsTypeMap>({
  'svelte/store': [
    ['Subscriber', true],
    'Unsubscriber',
    ['Updater', true],
    ['Invalidator', true],
    ['StartStopNotifier', true],
    ['Readable', true],
    ['Writable', true],
    'Stores',
    ['StoresValues', true],
  ],
})

export const svelteMotion = <ImportsTypeMap>({
  'svelte/motion': [
    ['Spring', true],
    ['Tweened', true],
  ],
})

export const svelteTransition = <ImportsTypeMap>({
  'svelte/transition': [
    'EasingFunction',
    'TransitionConfig',
    'BlurParams',
    'FadeParams',
    'FlyParams',
    'SlideParams',
    'ScaleParams',
    'DrawParams',
    'CrossfadeParams',
  ],
})
