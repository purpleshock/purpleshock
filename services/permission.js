const _ = require('lodash')
const httpError = require('../utils/httpError')

async function getAdminPermission (admin) {
  // find permissions by adminId
  return Object.assign(admin, {
    scopes: {
      vouchers: ['create']
    }
  })
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

module.exports = {
  getAdminPermission,
  getCheckScopesMiddleware
}
