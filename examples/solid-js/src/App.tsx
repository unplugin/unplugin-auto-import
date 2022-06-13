import MainLayout from './layouts/MainLayout'
import PageA from './views/PageA'
import PageB from './views/PageB'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <div className="App" style={{ 'text-align': 'center' }}>
      <IconLogosSolidjs style={{ width: '5rem', height: 'auto' }} />
      <header className="App-header">
        <p>
          <button type="button" onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
      <MainLayout>
        <Routes>
          {/* <Route path="/" element={<MainLayout />}> */}
          <Route path="/list" element={<PageA />} />
          <Route path="/detail/:id" element={<PageB />} />
          {/* </Route> */}
        </Routes>
      </MainLayout>
    </div>
  )
}

export default App
