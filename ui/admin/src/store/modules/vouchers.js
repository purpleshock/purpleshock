import Vue from 'vue'
import { vouchers } from '../../services'
import { FIND_BATCH, FIND_BELONGED_VOUCHERS } from './batches'

export const FIND_VOUCHER = 'vouchers/findVoucher'
export const GET_VOUCHER_SUGGEST = 'vouchers/getVoucherSuggest'
export const UPDATE_VOUCHER = 'vouchers/updateVoucher'

export default {
  state: {},
  mutations: {
    [FIND_VOUCHER] (state, payload) {
      Vue.set(state, payload.code, payload)
    },
    [UPDATE_VOUCHER] (state, payload) {
      const { code, ...other } = payload
      state[code] = {
        ...state[code],
        ...other
      }
    },
    [FIND_BELONGED_VOUCHERS] (state, payload) {
      payload.vouchers.forEach(voucher => {
        Vue.set(state, voucher.code, voucher)
      })
    }
  },
  actions: {
    async [GET_VOUCHER_SUGGEST] (context, payload) {
      const foundVouchers = await vouchers.getVoucherSuggest(payload.term, payload.size)
      return foundVouchers
    },
    async [FIND_VOUCHER] (context, payload) {
      const voucher = await vouchers.getVoucher(payload.code)
      await context.dispatch(FIND_BATCH, {
        code: voucher.batchCode
      })
      context.commit(FIND_VOUCHER, {
        ...voucher,
        code: payload.code
      })
    },
    async [UPDATE_VOUCHER] (context, payload) {
      const { code, ...other } = payload
      await vouchers.updateVoucher(code, other)
      context.commit(UPDATE_VOUCHER, payload)
    }
  }
}
