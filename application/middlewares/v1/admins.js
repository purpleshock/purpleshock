const express = require('express')
const wrapper = require('../wrapper')
const registration = require('../../services/registration')
const finder = require('../../services/finder')
const permission = require('../../services/permission')
const formatter = require('./formatters/admins')

const admins = express.Router()

admins.post('/', wrapper({
  body: formatter.registerAdminBody,
  response: formatter.registerAdminResponse,
  errors: {
    [registration.MAIL_EXIST]: 405
  },
  handler (req, res) {
    return registration.registerAdmin(req.body.mail, req.body.password)
  }
}))

admins.post('/session', wrapper({
  body: formatter.exchangeTokenBody,
  response: formatter.exchangeTokenResponse,
  errors: {
    [finder.MAIL_NOT_EXIST]: 404,
    [finder.INVALID_PASSWORD]: 404
  },
  handler (req, res) {
    return finder.loginAdmin(req.body.mail, req.body.password)
  }
}))

admins.get('/token', permission.getCheckTokenMiddleware(), (req, res) => {
  res.end('OK')
})

module.exports = admins
