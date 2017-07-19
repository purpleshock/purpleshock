import * as tokenApi from '../services/token'

export default function reducer (state = {}, action) {
  switch (action.type) {
    default:
      return state
  }
}

export function login (mail, password) {
  return async dispatch => {
    const token = await tokenApi.getToken(mail, password)
    console.log(token)
  }
}