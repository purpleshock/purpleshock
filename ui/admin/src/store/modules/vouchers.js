import Vue from 'vue'
import { vouchers } from '../../services'
import { FIND_BATCH } from './batches'

export const FIND_VOUCHER = 'voucher/findVoucher'
export const ON_FIND_VOUCHER = 'voucher/onFindVoucher'

export const UPDATE_VOUCHER = 'voucher/updateVoucher'
export const ON_UPDATE_VOUCHER = 'voucher/updateVoucher'

export const GET_VOUCHER_SUGGEST = 'voucher/getVoucherSuggest'

export default {
  state: {
    list: null,
    instances: {}
  },
  mutations: {
    [FIND_VOUCHER] (state, payload) {
      Vue.set(state.instances, payload.code, null)
    },
    [ON_FIND_VOUCHER] (state, payload) {
      Vue.set(state.instances, payload.code, payload)
    },
    [ON_UPDATE_VOUCHER] (state, payload) {
      const { code, ...other } = payload
      state.instances[code] = {
        ...state.instances[code],
        ...other
      }
    },
    [GET_VOUCHER_SUGGEST] (state, payload) {
      state.list = payload.codes
    }
  },
  actions: {
    async [FIND_VOUCHER] (context, payload) {
      const voucher = await vouchers.getVoucher(payload.code)
      await context.dispatch(FIND_BATCH, {
        code: voucher.batchCode
      })
      context.commit(ON_FIND_VOUCHER, {
        ...voucher,
        code: payload.code
      })
    },
    async [UPDATE_VOUCHER] (context, payload) {
      const { code, ...other } = payload
      await vouchers.updateVoucher(code, other)
      context.commit(ON_UPDATE_VOUCHER, payload)
    },
    async [GET_VOUCHER_SUGGEST] (context, payload) {
      const codes = await vouchers.getCodes(payload.term, payload.size)
      context.commit(GET_VOUCHER_SUGGEST, { codes })
    }
  }
}
