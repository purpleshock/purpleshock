import moment from 'moment'
import * as voucherHistoryActions from '../actions/voucherHistory'

export default function reducer (state = {}, action) {
  switch (action.type) {
    case voucherHistoryActions.SEARCH_HISTORY:
      return searchHistory(state, action)
    default:
      return state
  }
}

function searchHistory (state, action) {
  return action.payload.histories.reduce((nextState, history) => {
    nextState[history.code] = {
      createdAt: moment.unix(history.createdAt),
      validAt: history.validAt && moment.unix(history.validAt),
      expiredAt: history.expiredAt && moment.unix(history.expiredAt)
    }
    return nextState
  }, {})
}
