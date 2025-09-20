import MainLayout from './layouts/MainLayout'

const App: ParentComponent = (props) => {
  const [count, setCount] = createSignal(0)

  return (
    <div class="App" style={{ 'text-align': 'center' }}>
      <IconLogosSolidjs style={{ width: '5rem', height: 'auto' }} />
      <header class="App-header">
        <p>
          <button type="button" onClick={() => setCount(count => count + 1)}>
            count is:
            {' '}
            {count()}
          </button>
        </p>
      </header>
      <MainLayout>
          {props.children}
      </MainLayout>
    </div>
  )
}

export default App
