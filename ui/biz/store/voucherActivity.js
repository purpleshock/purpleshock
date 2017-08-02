import * as voucherActions from '../actions/voucher'

const initialState = {
  isLoading: true
}

export default function reducer (state = {}, action) {
  switch (action.type) {
    case voucherActions.GET_VOUCHER:
      return initialState
    case voucherActions.ON_GET_VOUCHER:
      return onGetVoucher(state, action)
    default:
      return state
  }
}

function onGetVoucher (state, action) {
  return {
    isLoading: false,
    voucher: action.payload
  }
}
