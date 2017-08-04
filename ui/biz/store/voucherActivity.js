import * as voucherActions from '../actions/voucher'

const initialState = {
  isLoading: true
}

export default function reducer (state = {}, action) {
  switch (action.type) {
    case voucherActions.GET_VOUCHER:
      return getVoucher(state, action)
    case voucherActions.ON_GET_VOUCHER:
      return onGetVoucher(state, action)
    default:
      return state
  }
}

function getVoucher(state, action) {
  return {
    ...state,
    isLoading: true
  }
}

function onGetVoucher (state, action) {
  const { code, voucher } = action.payload
  return {
    isLoading: false,
    voucher: {
      ...voucher,
      code
    }
  }
}
