import React from 'react'

function PageA() {
  return (
    <div>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <ul>
        {[13, 14, 15].map(n => (
          <li key={n}>
            <nav>
              <Link to={`/detail/${Date.now()}?q=${Date.now() % n}`}>
                Detail-
                {n}
              </Link>
            </nav>
          </li>
        ))}
      </ul>
    </div>
  )
}

export type TypeA = number

export default PageA
