import Vue from 'vue'
import { batches } from '../../services'

export const CREATE_BATCH = 'batches/createBatch'
export const FIND_BATCH = 'batches/findBatch'
export const FIND_BATCHES = 'batches/findBatches'

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
    [FIND_BATCH] (state, payload) {
      Vue.set(state.instances, payload.code, payload)
    },
    [FIND_BATCHES] (state, payload) {
      state.list = payload.batches
      state.numTotal = payload.numTotal
      state.totalPages = Math.ceil(payload.numTotal / state.pageOffset)
    }
  },
  actions: {
    async [CREATE_BATCH] (context, payload) {
      await batches.createBatch(payload)
      context.commit(CREATE_BATCH)
    },
    async [FIND_BATCH] (context, payload) {
      const batch = await batches.getBatch(payload.code)
      context.commit(FIND_BATCH, {
        ...batch,
        code: payload.code
      })
    },
    async [FIND_BATCHES] (context, payload) {
      const { validAt, expiredAt, page } = payload
      const response = await batches.getBatches(validAt, expiredAt, page, context.state.pageOffset)
      context.commit(FIND_BATCHES, response)
    }
  }
}
