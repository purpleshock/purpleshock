import * as voucherApi from '../services/voucher'
import * as voucherStatus from './voucherStatus'

export const GET_SEARCH_RESULTS = 'suggest/GET_SEARCH_RESULTS'
export const ON_GET_SEARCH_RESULTS = 'suggest/ON_GET_SEARCH_RESULTS'

export function getSearchResults () {
  return {
    type: GET_SEARCH_RESULTS
  }
}

export function onGetSearchResults (results) {
  return {
    type: ON_GET_SEARCH_RESULTS,
    payload: results
  }
}

export function searchCodes (term) {
  return async (dispatch, getState) => {
    if (term) {
      const state = getState()
      if (!state.voucherAvailableStatus) {
        const status = await voucherApi.getAvailableStatus()
        dispatch(voucherStatus.onGetAvailableStatus(status))
      }

      dispatch(getSearchResults())

      const vouchers = await voucherApi.findVouchersByTerm(term)
      dispatch(onGetSearchResults(vouchers))
    }
  }
}
