import { ImportsTypeMap } from '../types'

export default <ImportsTypeMap>({
  pinia: [
    // https://pinia.esm.dev/api/modules/pinia.html#interfaces
    ['DefineSetupStoreOptions', 'Id, S, G, A'],
    ['DefineStoreOptions', 'Id, S, G, A'],
    ['DefineStoreOptionsBase', 'S, Store'],
    ['DefineStoreOptionsInPlugin', 'Id, S, G, A'],
    'MapStoresCustomization',
    'Pinia',
    ['PiniaCustomProperties', 'Id, S, G, A'],
    ['PiniaCustomStateProperties', 'S'],
    ['PiniaPluginContext', 'Id, S, G, A'],
    'PiniaStorePlugin',
    ['StoreDefinition', 'Id, S, G, A'],
    ['StoreProperties', 'Id'],
    'SubscriptionCallbackMutationDirect',
    'SubscriptionCallbackMutationPatchFunction',
    ['SubscriptionCallbackMutationPatchObject', 'S'],
    // https://pinia.esm.dev/api/modules/pinia.html#genericstore
    ['GenericStore', 'Id, S, G, A'],
    'StateTree',
    ['Store', 'Id, S, G, A'],
    ['StoreActions', 'SS'],
    'StoreGeneric',
    ['StoreGetters', 'SS'],
    ['StoreOnActionListener', 'Id, S, G, A'],
    ['StoreOnActionListenerContext', 'Id, S, G, A'],
    ['StoreState', 'SS'],
    ['SubscriptionCallback', 'S'],
    ['SubscriptionCallbackMutation', 'S'],
  ],
})
