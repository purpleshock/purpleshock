const express = require('express')
const wrap = require('../wrap')
const { permission, batch, batchFinder } = require('../../services')
const formatters = require('../formatters')
const { createVcouhersBody, createVouchersResponse, findVouchersQuery, findVouchersResponse } = require('../formatters/vouchers')

const vouchers = express.Router()

vouchers.get('/',
  permission.getCheckScopesMiddleware(['vouchers.find']),
  formatters.validateQuery(findVouchersQuery),
  wrap(async (req, res, next) => {
    const { validAt, expiredAt, page, size } = req.query
    const batches = await batchFinder.findBetweenValidTime(validAt, expiredAt, {
      page,
      size
    })
    const response = await formatters.validate(batches, findVouchersResponse)
    res.json(response)
  })
)

vouchers.post('/',
  permission.getCheckScopesMiddleware(['vouchers.create']),
  formatters.valdateBody(createVcouhersBody),
  wrap(async (req, res, next) => {
    const createdBatch = await batch.createBatch(req.user.adminId, req.body)
    const response = await formatters.validate(createdBatch, createVouchersResponse)
    res.json(response)
  })
)

module.exports = vouchers
