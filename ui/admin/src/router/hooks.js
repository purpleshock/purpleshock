import { me, localStorage } from '../services'
import store from '../store'
import { ON_GET_INFO } from '../store/modules/user'

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

  let userInfo
  try {
    userInfo = await me.getUserInfo()
  } catch (err) {
    userInfo = false
  }

  if (userInfo) {
    await store.commit(ON_GET_INFO, userInfo)
    return next()
  } else {
    return next('/')
  }
}
