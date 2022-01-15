import React from 'react'

const PageB = () => {
  const location = useLocation()
  const { id } = useParams()
  const [query] = useSearchParams()
  return (
    <div>
      <main>
        <h2>Who are we?</h2>
        <p>
            That feels like an existential question, don&apos;t you
            think?
        </p>
        <p>path: {location.pathname}</p>
        <p>params id: {id}</p>
        <p>query q: {query.get('q')}</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  )
}

export default PageB
