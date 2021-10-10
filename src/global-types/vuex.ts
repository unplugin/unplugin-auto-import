import { ImportsTypeMap } from '../types'

export default <ImportsTypeMap>({
  vuex: [
    // https://github.com/vuejs/vuex/blob/dev/types/index.d.ts
    'Dispatch',
    'Commit',
    ['ActionContext', 'S, R'],
    'Payload',
    'MutationPayload',
    'ActionPayload',
    'SubscribeOptions',
    ['ActionSubscriber', 'P, S'],
    ['ActionErrorSubscriber', 'P, S'],
    ['ActionSubscribersObject', 'P, S'],
    ['SubscribeActionOptions', 'P, S'],
    'DispatchOptions',
    'CommitOptions',
    ['StoreOptions', 'S'],
    ['ActionHandler', 'S, R'],
    ['ActionObject', 'S, R'],
    ['Getter', 'S, R'],
    ['Action', 'S, R'],
    ['Mutation', 'S'],
    ['Plugin', 'S'],
    ['Module', 'S, R'],
    'ModuleOptions',
    ['GetterTree', 'S, R'],
    ['ActionTree', 'S, R'],
    ['MutationTree', 'S'],
    ['ModuleTree', 'R'],
    ['DefineStoreOptions', 'Id, S, G, A'],
    // https://github.com/vuejs/vuex/blob/dev/types/logger.d.ts
    ['LoggerOption', 'S'],
  ],
})
