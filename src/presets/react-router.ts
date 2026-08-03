import type { ImportsMap } from '../types'

/**
 * Available from React Router v6.
 */
export const ReactRouterHooks = [
  'useOutletContext',
  'useHref',
  'useInRouterContext',
  'useLocation',
  'useNavigationType',
  'useNavigate',
  'useOutlet',
  'useParams',
  'useResolvedPath',
  'useRoutes',
]

/**
 * Lived in `react-router-dom` until v7, moved into `react-router` in v8.
 */
export const ReactRouterDomExports = [
  'useLinkClickHandler',
  'useSearchParams',

  // components

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
]

/**
 * Only compatible with React Router v8, where `react-router-dom` was merged in.
 * For v6 and v7, use the `react-router-dom` preset instead.
 */
export default <ImportsMap>({
  'react-router': [
    ...ReactRouterHooks,
    ...ReactRouterDomExports,
  ],
})
