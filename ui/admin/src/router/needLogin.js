import { admins } from '../services'

export default function needLogin (redirect = '/') {
  return function tokenCheckMiddleware (from, to, next) {
    admins.checkToken()
    .then(isValid => {
      if (isValid) {
        next()
      } else {
        next(redirect)
      }
    })
    .catch(() => {
      next(redirect)
    })
  }
}

export const toIndexIfAnnoymous = needLogin('/')
