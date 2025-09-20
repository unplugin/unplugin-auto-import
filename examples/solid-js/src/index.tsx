/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App'
import PageA from './views/PageA'
import PageB from './views/PageB'

render(
  () => (
    <Router root={App}>
      <Route path="/list" component={PageA} />
      <Route path="/detail/:id" component={PageB} />
    </Router>
  ),
  document.getElementById('root') as HTMLElement,
)
