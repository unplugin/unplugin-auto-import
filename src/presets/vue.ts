import { ImportsMap } from '../types'

export const CommonCompositionAPI = [
  // lifecycle
  'onActivated',
  'onBeforeMount',
  'onBeforeUnmount',
  'onBeforeUpdate',
  'onErrorCaptured',
  'onDeactivated',
  'onMounted',
  'onServerPrefetch',
  'onUnmounted',
  'onUpdated',

  // setup helpers
  'useAttrs',
  'useSlots',

  // reactivity,
  'computed',
  'customRef',
  'isReadonly',
  'isRef',
  'markRaw',
  'reactive',
  'readonly',
  'ref',
  'shallowReactive',
  'shallowReadonly',
  'shallowRef',
  'triggerRef',
  'toRaw',
  'toRef',
  'toRefs',
  'unref',
  'watch',
  'watchEffect',

  // component
  'defineComponent',
  'defineAsyncComponent',
  'getCurrentInstance',
  'h',
  'inject',
  'nextTick',
  'provide',
  'useCssModule',
  'createApp',

  // effect scope
  'effectScope',
  'EffectScope',
  'getCurrentScope',
  'onScopeDispose',
]

export default <ImportsMap>({
  vue: [
    ...CommonCompositionAPI,

    // vue3 only
    'onRenderTracked',
    'onRenderTriggered',
  ],
})
