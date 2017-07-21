import * as voucherApi from '../services/voucher'

const FIND_VOUCHER = 'ps-biz/vouchers/findVoucher'
const UPDATE_VOUCHER = 'ps-biz/vouchers/updateVoucher'

export default function reducer (state = {}, action) {
  return state
}

export function createVoucher (formData) {
  return dispatch => {
    return voucherApi.createVouchers(formData)
    .then(response => {
      console.log(response)
    })
  }
}
