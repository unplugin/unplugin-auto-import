import type { ImportsMap } from '../types'
import { mobx } from './mobx'

export default <ImportsMap>({
  'mobx-react-lite': [
    // https://pinia.esm.dev/api/modules/pinia.html#functions
    ...mobx,
    'observer',
    'Observer',
    'useLocalObservable',
  ],
})
