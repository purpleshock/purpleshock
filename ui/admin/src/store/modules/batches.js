import Vue from 'vue'
import { batches } from '../../services'

export const CREATE_BATCH = 'batches/createBatch'
export const FIND_BATCH = 'batches/findBatch'
export const FIND_BATCHES = 'batches/findBatches'

export default {
  state: {},
  mutations: {
    [FIND_BATCH] (state, payload) {
      Vue.set(state, payload.code, payload)
    },
    [FIND_BATCHES] (state, payload) {
      payload.batches.forEach(batch => {
        Vue.set(state, batch.code, batch)
      })
    }
  },
  actions: {
    async [CREATE_BATCH] (context, payload) {
      await batches.createBatch(payload)
    },
    async [FIND_BATCH] (context, payload) {
      const batch = await batches.getBatch(payload.code)
      context.commit(FIND_BATCH, {
        ...batch,
        code: payload.code
      })
    }
  }
}
