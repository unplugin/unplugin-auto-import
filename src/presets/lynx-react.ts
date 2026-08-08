import type { ImportsMap } from '../types'

// https://lynxjs.org/api/react.html#functions
export const CommonLynxReactAPI = [
  'useState',
  'useCallback',
  'useMemo',
  'useEffect',
  'useRef',
  'useContext',
  'useReducer',
  'useImperativeHandle',
  'useDebugValue',
  'useSyncExternalStore',
  'lazy',
  'memo',
  'createRef',
  'forwardRef',
]

export default <ImportsMap>{
  '@lynx-js/react': CommonLynxReactAPI,
}
