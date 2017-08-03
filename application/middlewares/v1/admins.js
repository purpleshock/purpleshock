const express = require('express')
const httpError = require('../../utils/httpError')
const wrapper = require('../wrapper')
const registration = require('../../services/registration')
const finder = require('../../services/finder')
const token = require('../../services/token')
const permission = require('../../services/permission')
const formatter = require('./formatters/admins')

const admins = express.Router()

admins.post('/', wrapper({
  body: formatter.registerAdminBody,
  response: formatter.registerAdminResponse,
  async handler (req, res) {
    const { mail, password } = req.body
    const admin = await registration.registerAdmin(mail, password)
    const scopes = await permission.getAdminScopes(admin)
    const adminToken = await token.grantAdmin(admin, scopes)
    return {
      token: adminToken
    }
  }
}))

admins.post('/session', wrapper({
  body: formatter.exchangeTokenBody,
  response: formatter.exchangeTokenResponse,
  async handler (req, res) {
    const { mail, password } = req.body
    const admin = await finder.findAdminByMail(mail, password)
    if (!admin) {
      throw httpError(404)
    }
    const scopes = await permission.getAdminScopes(admin)
    const accessToken = await token.grantAdmin(admin, scopes)
    return {
      token: accessToken
    }
  }
}))

admins.get('/token', permission.getCheckTokenMiddleware(), (req, res) => {
  res.end('OK')
})

module.exports = admins
