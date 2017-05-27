const express = require('express')
const httpError = require('../../utils/httpError')
const wrap = require('../wrap')
const { registration, finder, token } = require('../../services')
const { TYPE_MAIL_PWD, validate } = require('../../utils/validators')

const admins = express.Router()

admins.post('/', wrap(async (req, res) => {
  const { mail, password } = await validate(req.body, TYPE_MAIL_PWD)
  const admin = await registration.registerAdmin(mail, password)
  const adminToken = await token.grantAdmin(admin)
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

  const accessToken = await token.grantAdmin(admin)
  res.json({
    token: accessToken
  })
}))

module.exports = admins
