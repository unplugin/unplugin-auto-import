import type { JSX } from 'solid-js/jsx-runtime'

interface MainLayoutProps {
  children: JSX.Element
}

const MainLayout: Component = (props: MainLayoutProps) => {
  return (
    <div>
      <h1>Main Layout Header</h1>
      <nav>
        <Link href="/list">List</Link>
      </nav>
      {props.children}
      <h1>Main Layout Footer</h1>
    </div>
  )
}

export default MainLayout
