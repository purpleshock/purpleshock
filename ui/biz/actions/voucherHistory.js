import * as voucherHistoryApi from '../services/voucherHistory'

export const SEARCH_HISTORY = 'ps-biz/voucherHistory/SEARCH_HISTORY'

export function searchHistory (validAt, expiredAt, page) {
  return async dispatch => {
    const histories = await voucherHistoryApi.queryHistory(validAt, expiredAt, page, 10)
    dispatch({
      type: SEARCH_HISTORY,
      payload: {
        page,
        histories
      }
    })
  }
}
