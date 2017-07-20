import * as tokenApi from '../services/token'

export default function reducer (state = {}, action) {
  switch (action.type) {
    default:
      return state
  }
}

export function login (mail, password) {
  return dispatch => {
    return tokenApi.exchangeToken(mail, password)
  }
}
