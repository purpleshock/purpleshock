import axios from 'axios'
import window from 'global/window'

export function isValid (token) {
  return axios.get(`${process.env.AP}/api/v1/admins/token`, {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
  .then(() => Promise.resolve(true))
  .catch(err => Promise.resolve(false))
}

export function getToken (mail, password) {
  return axios.post('/login', {
    mail,
    password
  })
  .then(response => {
    window.localStorage.setItem('token', response.data.token)
    return response.data.token
  })
}