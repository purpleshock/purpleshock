import Vue from 'vue'
import { batches } from '../../services'

export const FIND_HISTORY = 'voucherHistory/findHistory'
export const FIND_BELONGED_VOUCHERS = 'voucherHistory/findBelongedVouchers'

export default {
  state: {
    page: 0,
    totalPages: 0,
    pageOffset: 10,
    batches: {}
  },
  actions: {
    async [FIND_HISTORY] (context, payload) {
      const { validAt, expiredAt } = payload
      const { page, pageOffset, totalPages } = context.state

      if (page === 0 || page < totalPages) {
        const response = await batches.getBatches(validAt, expiredAt, page + 1, pageOffset)
        context.commit(FIND_HISTORY, response)
      }
    },
    async [FIND_BELONGED_VOUCHERS] (context, payload) {
      const { page, totalPages, pageOffset } = context.state.batches[payload.code]

      if (page === 0 || page < totalPages) {
        const numTotal = await batches.getVouchersCount(payload.code)
        const vouchers = await batches.getBelongedVouchers(payload.code, page + 1, pageOffset)
        context.commit(FIND_BELONGED_VOUCHERS, {
          vouchers,
          numTotal,
          code: payload.code
        })
      }
    }
  },
  mutations: {
    [FIND_HISTORY] (state, payload) {
      // add batches
      for (let batch of payload.batches) {
        Vue.set(state.batches, batch.code, {
          page: 0,
          totalPages: 0,
          pageOffset: 10,
          vouchers: []
        })
      }

      // calculate current page location
      state.page = Math.ceil(Object.keys(state.batches).length / state.pageOffset)
      state.totalPages = Math.ceil(payload.numTotal / state.pageOffset)
    },
    [FIND_BELONGED_VOUCHERS] (state, payload) {
      const batch = state.batches[payload.code]
      const voucherCodes = payload.vouchers.map(v => v.code)
      const newVouchers = batch.vouchers.concat(voucherCodes)

      batch.page = Math.ceil(newVouchers.length / batch.pageOffset)
      batch.totalPages = Math.ceil(payload.numTotal / batch.pageOffset)
      batch.vouchers = newVouchers
    }
  }
}
