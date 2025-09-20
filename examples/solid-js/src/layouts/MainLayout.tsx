const MainLayout: ParentComponent = (props) => {
  return (
    <div>
      <h1>Main Layout Header</h1>
      <nav>
        <A href="/list">List</A>
      </nav>
      {props.children}
      <h1>Main Layout Footer</h1>
    </div>
  )
}

export default MainLayout
