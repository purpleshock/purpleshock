import * as suggestActions from '../actions/suggest'

const initialState = {
  vouchers: [],
  isLoading: false
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case suggestActions.GET_SEARCH_RESULTS:
      return getSearchResults(state, action)
    case suggestActions.ON_GET_SEARCH_RESULTS:
      return onGetSearchResults(state, action)
    default:
      return state
  }
}

function getSearchResults (state, action) {
  return {
    ...state,
    isLoading: true
  }
}

function onGetSearchResults (state, action) {
  return {
    ...state,
    vouchers: action.payload,
    isLoading: false
  }
}
