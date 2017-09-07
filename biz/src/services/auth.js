import axios from 'axios'
import window from 'global/window'

export function isLogin () {
  const token = getToken()
  if (token) {
    return axios.get('/api/v1/admins/token')
      .then(() => Promise.resolve(true))
      .catch(err => Promise.resolve(false))
  } else {
    return Promise.resolve(false)
  }
}

export function login (mail, password) {
  return axios.post('/api/v1/admins/session', {
    mail,
    password
  })
  .then(response => {
    setToken(response.data.token)
    axios.interceptors.request.use(addAuthorizationHeader)
    return response.data.token
  })
}

export function logout () {
  window.localStorage.removeItem('token')
  axios.interceptors.request.eject(addAuthorizationHeader)
  return Promise.resolve()
}

function setToken (token) {
  window.localStorage.setItem('token', token)
}

function getToken () {
  return window.localStorage.getItem('token')
}

function addAuthorizationHeader (config) {
  return {
    ...config,
    headers: {
      ...config.headers,
      'Authorization': `JWT ${getToken()}`
    }
  }
}

