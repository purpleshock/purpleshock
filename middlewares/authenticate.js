const jwt = require('express-jwt')
const config = require('../config')

const middlewareOpt = {
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
}

module.exports = function authenticate () {
  return jwt(middlewareOpt)
}
