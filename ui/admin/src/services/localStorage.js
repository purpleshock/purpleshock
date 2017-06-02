import window from 'global/window'

export function getJWT () {
  return window.localStorage.getItem('jwt')
}

export function setJWT (token) {
  return window.localStorage.setItem('jwt', token)
}
