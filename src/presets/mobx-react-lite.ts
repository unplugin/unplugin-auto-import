import type { ImportsMap } from '../types'
import { Mobx } from './mobx'

export default <ImportsMap>({
  'mobx-react-lite': [
    // https://pinia.esm.dev/api/modules/pinia.html#functions
    ...Mobx,
    'observer',
    'Observer',
    'useLocalObservable',
  ],
})
