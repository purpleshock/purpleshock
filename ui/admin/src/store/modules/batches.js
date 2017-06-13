import Vue from 'vue'
import { batches } from '../../services'

export const CREATE_BATCH = 'batches/createBatch'
export const ON_CREATE_BATCH = 'batches/onCreateBatch'

export const FIND_BATCH = 'batches/findBatch'
export const ON_FIND_BATCH = 'batches/findBatch'

export const FIND_BATCHES = 'batches/findBatches'
export const ON_FIND_BATCHES = 'batches/onFindBatches'

export default {
  state: {
    list: [],
    pageOffset: 10,
    numTotal: 0,
    totalPages: 0,
    instances: {}
  },
  mutations: {
    [CREATE_BATCH] (state, payload) {
    },
    [ON_CREATE_BATCH] (state, payload) {
    },
    [FIND_BATCH] (state, payload) {
      Vue.set(state.instances, payload.code, null)
    },
    [ON_FIND_BATCH] (state, payload) {
      Vue.set(state.instances, payload.code, payload)
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
    async [FIND_BATCH] (context, payload) {
      const batch = await batches.getBatch(payload.code)
      context.commit(ON_FIND_BATCH, {
        ...batch,
        code: payload.code
      })
    },
    async [FIND_BATCHES] ({ commit, state }, payload) {
      const { validAt, expiredAt, page } = payload
      const { pageOffset } = state
      const response = await batches.getBatches(validAt, expiredAt, page, pageOffset)
      commit(ON_FIND_BATCHES, response)
    }
  }
}
