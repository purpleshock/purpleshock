const _ = require('lodash')
const jwt = require('express-jwt')
const httpError = require('../utils/httpError')

async function getAdminScopes (adminId) {
  // find permissions by adminId
  return {
    batches: ['find', 'create'],
    vouchers: ['find', 'modify']
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
    secret: process.env.JWT_SECRET,
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
