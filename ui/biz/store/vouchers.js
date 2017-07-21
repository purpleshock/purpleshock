import * as voucherApi from '../services/voucher'

const FIND_VOUCHER = 'ps-biz/vouchers/findVoucher'
const UPDATE_VOUCHER = 'ps-biz/vouchers/updateVoucher'

export default function reducer (state = {}, action) {
  return state
}

export function createVoucher (formData) {
  return dispatch => {
    debugger
    return voucherApi.createVouchers(formData)
    .then(response => {
      console.log(response)
    debugger
    })
  }
}

// export default {
//   state: {},
//   mutations: {
//     [FIND_VOUCHER] (state, payload) {
//       Vue.set(state, payload.code, payload)
//     },
//     [UPDATE_VOUCHER] (state, payload) {
//       const { code, ...other } = payload
//       state[code] = {
//         ...state[code],
//         ...other
//       }
//     },
//     [FIND_BELONGED_VOUCHERS] (state, payload) {
//       payload.vouchers.forEach(voucher => {
//         Vue.set(state, voucher.code, voucher)
//       })
//     }
//   },
//   actions: {
//     async [GET_VOUCHER_SUGGEST] (context, payload) {
//       const foundVouchers = await vouchers.getVoucherSuggest(payload.term, payload.size)
//       return foundVouchers
//     },
//     async [FIND_VOUCHER] (context, payload) {
//       const voucher = await vouchers.getVoucher(payload.code)
//       await context.dispatch(FIND_BATCH, {
//         code: voucher.batchCode
//       })
//       context.commit(FIND_VOUCHER, {
//         ...voucher,
//         code: payload.code
//       })
//     },
//     async [UPDATE_VOUCHER] (context, payload) {
//       const { code, ...other } = payload
//       await vouchers.updateVoucher(code, other)
//       context.commit(UPDATE_VOUCHER, payload)
//     }
//   }
// }
