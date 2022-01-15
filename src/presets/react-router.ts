import type { ImportsMap } from '../types'

/**
 * Only compatible with React Router v6.
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

export default <ImportsMap>({
  'react-router': [
    ...ReactRouterHooks,
  ],
})
