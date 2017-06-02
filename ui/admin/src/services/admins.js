import { fetchJSON, fetchApi } from './fetch'

export function login (mail, password) {
  return fetchJSON('/api/v1/admins/session', {
    method: 'POST',
    body: {
      mail,
      password
    }
  })
}

export function checkToken () {
  return fetchApi('/api/v1/admins/token')
    .then(() => Promise.resolve(true))
    .catch(err => {
      if (err.status === 401 || err.status === 404) {
        return Promise.resolve(false)
      } else {
        throw err
      }
    })
}
