import type { ImportsMap } from '../types'

export const Mobx = [
  // https://mobx.js.org/api.html
  'makeObservable',
  'makeAutoObservable',
  'extendObservable',
  'observable',
  'action',
  'runInAction',
  'flow',
  'flowResult',
  'computed',
  'autorun',
  'reaction',
  'when',
  'onReactionError',
  'intercept',
  'observe',
  'onBecomeObserved',
  'onBecomeUnobserved',
  'toJS',
]

export default <ImportsMap>({
  mobx: [
    // https://mobx.js.org/api.html
    ...Mobx,
  ],
})
