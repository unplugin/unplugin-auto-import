import React from 'react'

function MainLayout() {
  return (
    <div>
      <h1>Main Layout Header</h1>
      <nav>
        <Link to="/list">List</Link>
      </nav>
      <Outlet />
      <h1>Main Layout Footer</h1>
    </div>
  )
}

export default MainLayout
