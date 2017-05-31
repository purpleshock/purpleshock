const express = require('express')
const wrap = require('../wrap')
const { permission } = require('../../services')

const vouchers = express.Router()

vouchers.post('/', permission.getCheckScopesMiddleware(['vouchers.create']), wrap(async (req, res, next) => {
  res.end()
}))

module.exports = vouchers
