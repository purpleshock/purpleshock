import Vue from 'vue'
import { vouchers } from '../../services'
import { FIND_BATCH } from './batches'

export const FIND_VOUCHER = 'voucher/findVoucher'
export const ON_FIND_VOUCHER = 'voucher/onFindVoucher'

export const UPDATE_VOUCHER = 'voucher/updateVoucher'
export const ON_UPDATE_VOUCHER = 'voucher/updateVoucher'

export default {
  state: {
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
    }
  }
}
