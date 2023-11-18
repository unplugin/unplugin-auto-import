const PageA: Component = () => {
  return (
    <div>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <ul>
        <For each={[13, 14, 15]}>
          {item => (
            <li>
              <nav>
                <NavLink
                  href={`/detail/${new Date().getTime()}?q=${new Date().getTime() % item}`}
                >
                  Detail-
                  {item}
                </NavLink>
              </nav>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}

export default PageA
