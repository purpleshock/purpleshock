import moment from 'moment'
import * as voucherHistoryActions from '../actions/voucherHistory'

const initialState = {
  creationOrder: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case voucherHistoryActions.SEARCH_HISTORY:
      return searchHistory(state, action)
    default:
      return state
  }
}

function searchHistory (state, action) {
  return {
    ...state,
    creationOrder: action.payload.histories
  }
}
