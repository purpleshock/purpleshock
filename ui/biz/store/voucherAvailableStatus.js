import * as voucherStatusActions from '../actions/voucherStatus'

export default function reducer (state = false, action) {
  switch (action.type) {
    case voucherStatusActions.ON_GET_AVAILABLE_STATUS:
      return onGetAvailableStatus(state, action)
    default:
      return state
  }
}

function onGetAvailableStatus (state, action) {
  return action.payload.reduce((state, status) => {
    state[status] = status
    return state
  }, {})
}
