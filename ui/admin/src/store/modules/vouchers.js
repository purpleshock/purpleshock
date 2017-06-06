import { vouchers } from '../../services'
export const CREATE_VOUCHERS = 'vouchers/createVouchers'
export const ON_CREATE_VOUCHERS = 'vouchers/onCreateVouchers'

export default {
  state: {
  },
  mutations: {
    [CREATE_VOUCHERS] (state, payload) {
    }
  },
  actions: {
    async [CREATE_VOUCHERS] ({ commit }, payload) {
      await vouchers.createVouchers(payload)
      commit(ON_CREATE_VOUCHERS)
    }
  }
}
