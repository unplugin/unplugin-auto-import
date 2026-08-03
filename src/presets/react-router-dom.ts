import type { ImportsMap } from '../types'
import { ReactRouterDomExports, ReactRouterHooks } from './react-router'

/**
 * Only compatible with React Router Dom v6 and v7.
 * The package was removed in v8 — use the `react-router` preset instead.
 */
export default <ImportsMap>({
  'react-router-dom': [
    ...ReactRouterHooks,
    ...ReactRouterDomExports,
  ],
})
