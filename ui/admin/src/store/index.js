import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import voucherHistory from './modules/voucherHistory'
import vouchers from './modules/vouchers'
import batches from './modules/batches'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user,
    voucherHistory,
    vouchers,
    batches
  }
})
