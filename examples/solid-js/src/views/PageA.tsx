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
                <A
                  href={`/detail/${new Date().getTime()}?q=${new Date().getTime() % item}`}
                >
                  Detail-
                  {item}
                </A>
              </nav>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}

export default PageA
