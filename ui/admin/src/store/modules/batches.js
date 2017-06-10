import { batches } from '../../services'

export const CREATE_BATCH = 'batches/createBatch'
export const ON_CREATE_BATCH = 'batches/onCreateBatch'

export const FIND_BATCHES = 'batches/findBatches'
export const ON_FIND_BATCHES = 'batches/onFindBatches'

export default {
  state: {
    list: [],
    pageOffset: 10,
    numTotal: 0,
    totalPages: 0
  },
  mutations: {
    [CREATE_BATCH] (state, payload) {
    },
    [ON_CREATE_BATCH] (state, payload) {
    },
    [ON_FIND_BATCHES] (state, payload) {
      state.list = payload.batches
      state.numTotal = payload.numTotal
      state.totalPages = Math.ceil(payload.numTotal / state.pageOffset)
    }
  },
  actions: {
    async [CREATE_BATCH] ({ commit }, payload) {
      await batches.createBatch(payload)
      commit(ON_CREATE_BATCH)
    },
    async [FIND_BATCHES] ({ commit, state }, payload) {
      const { validAt, expiredAt, page } = payload
      const { pageOffset } = state
      const response = await batches.getBatches(validAt, expiredAt, page, pageOffset)
      commit(ON_FIND_BATCHES, response)
    }
  }
}
