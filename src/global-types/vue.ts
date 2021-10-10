import { ImportsTypeMap, ImportNameAlias, ImportNameTypeAlias } from '../types'

export const CommonCompositionTypes: (string | ImportNameAlias | ImportNameTypeAlias)[] = [
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

export const pickVueTypes = (...types: Array<string>): (string | ImportNameAlias | ImportNameTypeAlias)[] => {
  const result: (string | ImportNameAlias | ImportNameTypeAlias)[] = []
  const set = new Set<string>(types)
  CommonCompositionTypes.forEach((type) => {
    if (typeof type === 'string')
      set.has(type) && result.push(type)
    else if (set.has(type[0]))
      result.push(type)
  })
  return result
}

export default <ImportsTypeMap>({
  vue: [
    ...CommonCompositionTypes,
  ],
})
