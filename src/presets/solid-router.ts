import type { ImportsMap } from '../types'

const imported = [
  'Link',
  'NavLink',
  'Navigate',
  'Outlet',
  'Route',
  'Router',
  'Routes',
  '_mergeSearchString',
  'createIntegration',
  'hashIntegration',
  'normalizeIntegration',
  'pathIntegration',
  'staticIntegration',
  'useHref',
  'useIsRouting',
  'useLocation',
  'useMatch',
  'useNavigate',
  'useParams',
  'useResolvedPath',
  'useRouteData',
  'useRoutes',
  'useSearchParams',
]

export default <ImportsMap>({
  'solid-app-router': imported,
  '@solidjs/router': imported,
})
