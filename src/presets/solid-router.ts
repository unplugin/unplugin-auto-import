import type { ImportsMap } from '../types'

export default <ImportsMap>({
  '@solidjs/router': [
    // Components
    'A',
    'HashRouter',
    'MemoryRouter',
    'Navigate',
    'Route',
    'Router',

    // Data APIs
    'action',
    'createAsync',
    'createAsyncStore',
    'query',
    'revalidate',
    'useAction',
    'useSubmission',
    'useSubmissions',

    // Primitives
    'useBeforeLeave',
    'useCurrentMatches',
    'useIsRouting',
    'useLocation',
    'useMatch',
    'useNavigate',
    'useParams',
    'usePreloadRoute',
    'useSearchParams',
  ],
})
