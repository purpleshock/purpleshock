import Vue from 'vue'
import { batches } from '../../services'

export const CREATE_BATCH = 'batches/createBatch'
export const FIND_BATCH = 'batches/findBatch'
export const FIND_BATCHES = 'batches/findBatches'
export const FIND_BELONGED_VOUCHERS = 'batches/findBelongedVouchers'

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
      state.list = payload.batches.map(batch => batch.code)
      state.numTotal = payload.numTotal
      state.totalPages = Math.ceil(payload.numTotal / state.pageOffset)
      payload.batches.forEach(batch => {
        Vue.set(state.instances, batch.code, {
          ...batch,
          pagination: 10,
          vouchers: []
        })
      })
    },
    [FIND_BELONGED_VOUCHERS] (state, payload) {
      const vouchers = payload.vouchers.map(voucher => voucher.code)
      const nextVouchers = state.instances[payload.code].vouchers.concat(vouchers)
      state.instances[payload.code].vouchers = nextVouchers
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
    },
    async [FIND_BELONGED_VOUCHERS] (context, payload) {
      const { numTotal, vouchers, pagination } = context.state.instances[payload.code]
      const page = (numTotal && vouchers)
        ? Math.floor(numTotal / vouchers.length) + 1
        : 1
      const foundVouchers = await batches.getBelongedVouchers(payload.code, page, pagination)
      context.commit(FIND_BELONGED_VOUCHERS, {
        code: payload.code,
        page,
        pagination,
        vouchers: foundVouchers
      })
    }
  }
}
