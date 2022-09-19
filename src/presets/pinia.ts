import type { ImportsMap } from '../types'

export default <ImportsMap>({
  pinia: [
    // https://pinia.esm.dev/api/modules/pinia.html#functions
    'acceptHMRUpdate',
    'createPinia',
    'defineStore',
    'getActivePinia',
    'mapActions',
    'mapGetters',
    'mapState',
    'mapStores',
    'mapWritableState',
    'setActivePinia',
    'setMapStoreSuffix',
    'storeToRefs',
    
    // vue2
    'PiniaVuePlugin'
  ],
})
