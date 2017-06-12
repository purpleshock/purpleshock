import Vue from 'vue'
import { vouchers } from '../../services'
import { FIND_BATCH } from './batches'

const FIND_VOUCHER = 'voucher/findVoucher'
const ON_FIND_VOUCHER = 'voucher/onFindVoucher'

const UPDATE_VOUCHER = 'voucher/updateVoucher'
const ON_UPDATE_VOUCHER = 'voucher/updateVoucher'

export default {
  state: {
  },
  mutations: {
    [FIND_VOUCHER] (state, payload) {
      Vue.set(state, payload.code, null)
    },
    [ON_FIND_VOUCHER] (state, payload) {
      Vue.set(state, payload.code, payload)
    },
    [ON_UPDATE_VOUCHER] (state, payload) {
      const { code, ...other } = payload
      state[code] = {
        ...state[code],
        ...other
      }
    }
  },
  actions: {
    async [FIND_VOUCHER] (context, payload) {
      const voucher = await vouchers.getVoucher(payload.code)
      const batch = await context.dispatch(FIND_BATCH, {
        code: voucher.batchCode
      })
      context.commit(ON_FIND_VOUCHER, {
        ...voucher,
        code: payload.code,
        batch
      })
    },
    async [UPDATE_VOUCHER] (context, payload) {
      const { code, ...other } = payload
      await vouchers.updateVoucher(code, other)
      context.commit(ON_UPDATE_VOUCHER, payload)
    }
  }
}
