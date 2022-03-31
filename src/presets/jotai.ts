import type { ImportsMap } from '../types'

export const jotai = <ImportsMap>({
    jotai: [
        'atom',
        'useAtom',
        'useAtomValue',
        'useSetAtom',
    ]
})

export const jotaiUtils = <ImportsMap>({
    'jotai/utils': [
      'atomWithReset',
      'useResetAtom',
      'useReducerAtom',
      'atomWithReducer',
      'atomFamily',
      'selectAtom',
      'useAtomCallback',
      'freezeAtom',
      'freezeAtomCreator',
      'splitAtom',
      'atomWithDefault',
      'waitForAll',
      'atomWithStorage',
      'atomWithHash',
      'createJSONStorage',
      'atomWithObservable',
      'useHydrateAtoms',
      'loadable',
    ],
})