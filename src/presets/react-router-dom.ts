import type { ImportsMap } from '../types'
import { ReactRouterDomExports, ReactRouterHooks } from './react-router'

/**
 * Only compatible with React Router Dom v6 and v7.
 *
 * @deprecated `react-router-dom` was removed in React Router v8, where its
 * exports moved into `react-router`. Kept for v6 and v7 users; on v8 use the
 * `react-router` preset instead.
 */
export default <ImportsMap>({
  'react-router-dom': [
    ...ReactRouterHooks,
    ...ReactRouterDomExports,
  ],
})
