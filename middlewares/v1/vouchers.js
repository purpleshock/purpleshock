const express = require('express')
const wrap = require('../wrap')
const { permission, formatters, batch, batchFinder } = require('../../services')

const vouchers = express.Router()

vouchers.get('/',
  permission.getCheckScopesMiddleware(['vouchers.find']),
  formatters.validateQuery(formatters.vouchers.findQuery),
  wrap(async (req, res, next) => {
    const { validAt, expiredAt, page, size } = req.query
    const batches = await batchFinder.findBetweenValidTime(validAt, expiredAt, {
      page,
      size
    })
    res.json(batches)
  })
)

vouchers.post('/',
  permission.getCheckScopesMiddleware(['vouchers.create']),
  formatters.valdateBody(formatters.vouchers.createBody),
  wrap(async (req, res, next) => {
    const createdBatch = await batch.createBatch(req.user.adminId, req.body)
    res.json(createdBatch)
  })
)

module.exports = vouchers
