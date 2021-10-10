import { ImportsTypeMap, ImportNameAlias, ImportNameTypeAlias } from '../types'

export const CommonCompositionTypes: (string | ImportNameAlias | ImportNameTypeAlias)[] = [
  [true, 'Ref'],
  [true, 'ComputedRef'],
  [true, 'WritableComputedRef'],
  [true, 'WritableComputedOptions'],
  [true, 'ToRef'],
  [true, 'ToRefs'],
  [true, 'UnwrapRef'],
  [true, 'ShallowUnwrapRef'],
  [true, 'DeepReadonly'],
  [true, 'InjectionKey'],
  'WatchEffect',
  [true, 'WatchSource'],
  ['V, OV', 'WatchCallback'],
  ['Immediate', 'WatchOptions'],
  'WatchStopHandle',
  'ObjectEmitsOptions',
  'EmitsOptions',
]

export default <ImportsTypeMap>({
  vue: [
    ...CommonCompositionTypes,

    // vue 3 only
    'ReactiveEffectOptions',
  ],
})
