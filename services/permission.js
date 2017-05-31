const _ = require('lodash')
const jwt = require('express-jwt')
const config = require('../config')
const httpError = require('../utils/httpError')

async function getAdminScopes (admin) {
  // find permissions by adminId
  return {
    vouchers: ['create']
  }
}

function getCheckScopesMiddleware (permissions) {
  permissions = permissions.map(permission => permission.split('.'))

  return function middleware (req, res, next) {
    const scopes = _.get(req, 'user.scopes')

    if (scopes) {
      const valid = permissions.every(([permission, action]) => {
        const ownActions = scopes[permission]
        return ownActions && ownActions.indexOf(action) > -1
      })
      if (valid) {
        return next()
      }
    }
    return next(httpError(401, 'Unauthorized attempt'))
  }
}

function getCheckTokenMiddleware (opt = {}) {
  const middlewareOpt = Object.assign({
    secret: config.jwt.secret,
    getToken (req) {
      const { authorization } = req.headers
      if (authorization) {
        const jwt = authorization.split(' ')
        if (jwt[0] === 'JWT' && jwt[1].length > 0) {
          return jwt[1]
        }
      }
      return null
    }
  }, opt)

  return jwt(middlewareOpt)
}

module.exports = {
  getAdminScopes,
  getCheckScopesMiddleware,
  getCheckTokenMiddleware
}
