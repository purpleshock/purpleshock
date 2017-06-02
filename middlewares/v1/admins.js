const express = require('express')
const httpError = require('../../utils/httpError')
const wrap = require('../wrap')
const { registration, finder, token, permission } = require('../../services')
const { TYPE_MAIL_PWD, validate } = require('../../utils/validators')

const admins = express.Router()

admins.post('/', wrap(async (req, res) => {
  const { mail, password } = await validate(req.body, TYPE_MAIL_PWD)
  const admin = await registration.registerAdmin(mail, password)
  const scopes = await permission.getAdminScopes(admin)
  const adminToken = await token.grantAdmin(admin, scopes)
  res.json({
    token: adminToken
  })
}))

admins.post('/session', wrap(async (req, res) => {
  const { mail, password } = await validate(req.body, TYPE_MAIL_PWD)
  const admin = await finder.findAdminByMail(mail, password)
  if (!admin) {
    throw httpError(404)
  }
  const scopes = await permission.getAdminScopes(admin)
  const accessToken = await token.grantAdmin(admin, scopes)
  res.json({
    token: accessToken
  })
}))

admins.get('/token', permission.getCheckTokenMiddleware(), (req, res) => {
  res.end()
})

module.exports = admins
