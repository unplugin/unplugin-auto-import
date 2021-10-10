import { ImportsTypeMap, ImportNameTypeAlias } from '../types'

export const CommonCompositionTypes: (string | ImportNameTypeAlias)[] = [
  ['Ref', true],
  ['ComputedRef', true],
  ['WritableComputedRef', true],
  ['WritableComputedOptions', true],
  ['ToRef', true],
  ['ToRefs', true],
  ['UnwrapRef', true],
  ['ShallowUnwrapRef', true],
  ['DeepReadonly', true],
  ['InjectionKey', true],
  'WatchEffect',
  ['WatchSource', true],
  ['WatchCallback', 'V, OV'],
  ['WatchOptions', 'Immediate'],
  'WatchStopHandle',
  'ObjectEmitsOptions',
  'EmitsOptions',
]

export default <ImportsTypeMap>({
  vue: [
    ...CommonCompositionTypes,
  ],
})
