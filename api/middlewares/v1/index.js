const express = require('express')

module.exports = function api (auth) {
  const api = express.Router()

  api.use('/session', require('./session'))

  api.use(auth.authenticate())

  api.use('/me', require('./me'))

  return api
}
