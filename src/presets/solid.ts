import type { ImportsMap } from '../types'

export const solidCore = <ImportsMap>({
  'solid-js': [
    'createSignal',
    'createEffect',
    'createMemo',
    'createResource',
    'onMount',
    'onCleanup',
    'onError',
    'untrack',
    'batch',
    'on',
    'createRoot',
    'mergeProps',
    'splitProps',
    'useTransition',
    'observable',
    'mapArray',
    'indexArray',
    'createContext',
    'useContext',
    'children',
    'lazy',
    'createDeferred',
    'createRenderEffect',
    'createSelector',
    'For',
    'Show',
    'Switch',
    'Match',
    'Index',
    'ErrorBoundary',
    'Suspense',
    'SuspenseList',
  ],
})

export const solidStore = <ImportsMap>({
  'solid-js/store': [
    'createStore',
    'produce',
    'reconcile',
    'createMutable',
  ],
})

export const solidWeb = <ImportsMap>({
  'solid-js/web': [
    'Dynamic',
    'hydrate',
    'render',
    'renderToString',
    'renderToStringAsync',
    'renderToStream',
    'isServer',
    'Portal',
  ],
})

export default <ImportsMap>({
  ...solidCore,
  ...solidStore,
  ...solidWeb,
})
