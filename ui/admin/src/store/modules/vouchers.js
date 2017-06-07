import { vouchers } from '../../services'

export const CREATE_VOUCHERS = 'vouchers/createVouchers'
export const ON_CREATE_VOUCHERS = 'vouchers/onCreateVouchers'

export const FIND_VOUCHERS = 'vouchers/findVouchers'
export const ON_FIND_VOUCHERS = 'vouchers/onFindGetVouchers'

export default {
  state: {
    list: [],
    pageOffset: 10,
    totalPages: 0
  },
  mutations: {
    [CREATE_VOUCHERS] (state, payload) {
    },
    [ON_CREATE_VOUCHERS] (state, payload) {
    }
  },
  actions: {
    async [CREATE_VOUCHERS] ({ commit }, payload) {
      await vouchers.createVouchers(payload)
      commit(ON_CREATE_VOUCHERS)
    },
    async [FIND_VOUCHERS] ({ commit, state }, payload) {
      const { validAt, expiredAt, page } = payload
      const { pageOffset } = state
      await vouchers.getVouchers(validAt, expiredAt, page, pageOffset)
      commit(ON_FIND_VOUCHERS)
    }
  }
}
