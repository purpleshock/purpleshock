import * as voucherApi from '../services/voucher'

export default function reducer (state = {}, action) {
  return state
}

export function createVouchers (formData) {
  return dispatch => {
    return voucherApi.createVouchers(formData)
      .then(response => {
        // console.log(response)
      })
  }
}
