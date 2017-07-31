import * as voucherApi from '../services/voucher'

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
  return async dispatch => {
    if (term) {
      dispatch(getSearchResults())

      const vouchers = await voucherApi.findVouchersByTerm(term)
      dispatch(onGetSearchResults(vouchers))
    }
  }
}
