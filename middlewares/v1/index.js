const express = require('express')

module.exports = function api (auth) {
  const api = express.Router()

  api.use('/admins', require('./admins'))
  api.use('/players', require('./players'))

  api.use(auth.authenticate())

  api.use('/me', require('./me'))

  return api
}
