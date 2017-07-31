import * as voucherHistoryActions from '../actions/voucherHistory'

export default function reducer (state = { size: 10 }, action) {
  switch (action.type) {
    case voucherHistoryActions.SEARCH_HISTORY:
      return searchHistory(state, action)
    default:
      return state
  }
}

function searchHistory (state, action) {
  const { numTotal, page } = action.payload
  const totalPages = Math.ceil(numTotal / state.size)
  return Object.assign({}, state, {
    numTotal,
    page,
    totalPages
  })
}
