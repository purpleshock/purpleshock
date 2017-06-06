const express = require('express')
const wrap = require('../wrap')
const { permission, formatters, batch } = require('../../services')

const vouchers = express.Router()

vouchers.post('/',
  permission.getCheckScopesMiddleware(['vouchers.create']),
  formatters.valdateBody(formatters.vouchers.createBody),
  wrap(async (req, res, next) => {
    const createdBatch = await batch.createBatch(req.user.adminId, req.body)
    res.json(createdBatch)
  })
)

module.exports = vouchers
