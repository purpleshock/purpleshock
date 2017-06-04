import { me, localStorage } from '../services'

export function needAnnoymous (to, from, next) {
  const jwt = localStorage.getJWT()
  if (jwt) {
    return next('/dashboard')
  } else {
    return next()
  }
}

export async function needLogin (to, from, next) {
  const jwt = localStorage.getJWT()
  if (!jwt) {
    return next('/')
  }

  let userInfo, respErr
  try {
    userInfo = await me.getUserInfo()
  } catch (err) {
    respErr = err
  }

  // off-line or internal error
  if (respErr) {
    if (!respErr.hasOwnProperty('status') || respErr.status === 500) {
      return console.error('Oops. Something happens')
    }
  }

  if (userInfo) {
    return next()
  } else {
    return next('/')
  }
}
