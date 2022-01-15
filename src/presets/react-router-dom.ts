import type { ImportsMap } from '../types'
import { ReactRouterHooks } from './react-router'

/**
 * Only compatible with React Router Dom v6.
 */
export default <ImportsMap>({
  'react-router-dom': [
    ...ReactRouterHooks,

    // react-router-dom only hooks
    'useLinkClickHandler',
    'useSearchParams',

    // react-router-dom Component

    // call once in general
    // 'BrowserRouter',
    // 'HashRouter',
    // 'MemoryRouter',

    'Link',
    'NavLink',
    'Navigate',
    'Outlet',
    'Route',
    'Routes',
  ],
})
