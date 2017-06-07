import { vouchers } from '../../services'

export const CREATE_VOUCHERS = 'vouchers/createVouchers'
export const ON_CREATE_VOUCHERS = 'vouchers/onCreateVouchers'

export const FIND_VOUCHERS = 'vouchers/findVouchers'
export const ON_FIND_VOUCHERS = 'vouchers/onFindGetVouchers'

export default {
  state: {
    list: [],
    pageOffset: 10,
    numTotal: 0
  },
  getters: {
    totalPages: state => {
      return Math.ceil(state.numTotal / state.pageOffset)
    }
  },
  mutations: {
    [CREATE_VOUCHERS] (state, payload) {
    },
    [ON_CREATE_VOUCHERS] (state, payload) {
    },
    [ON_FIND_VOUCHERS] (state, payload) {
      state.list = payload.batches
      state.numTotal = payload.numTotal
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
      const response = await vouchers.getVouchers(validAt, expiredAt, page, pageOffset)
      commit(ON_FIND_VOUCHERS, response)
    }
  }
}
