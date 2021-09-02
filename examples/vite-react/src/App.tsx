// eslint-disable-next-line no-use-before-define
import React from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <IconLogosReact style={{ fontSize: '3em' }}/>
      <header className="App-header">
        <p>
          <button type="button" onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
