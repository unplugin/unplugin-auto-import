import type { ImportsMap } from '../types'

export const CommonReactAPI = [
  'useState',
  'useCallback',
  'useMemo',
  'useEffect',
  'useRef',
  'useContext',
  'useReducer',
  'useImperativeHandle',
  'useDebugValue',
  'useDeferredValue',
  'useLayoutEffect',
  'useTransition',
  'startTransition',
  'useSyncExternalStore',
  'useInsertionEffect',
  'useId',
  'lazy',
  'memo',
  'createRef',
  'forwardRef',
]

export default <ImportsMap>({
  react: CommonReactAPI,
})
