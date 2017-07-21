const express = require('express')
const joi = require('./joi')
const wrap = require('../wrap')
const wrapper = require('../wrapper')
const { permission, batchFinder, voucherFinder } = require('../../services')
const batch = require('../../services/batch')
const formatters = require('./formatters')
const {
  batchResponse,
  findBatchesQuery,
  findBatchesResponse
} = require('./formatters/batches')
const { findVouchersResponse } = require('./formatters/vouchers')
const { findCodesQuery, findCodesResponse } = require('./formatters/codeTerm')
const { paginationQuery } = require('./formatters/pagination')
const httpError = require('../../utils/httpError')

const batches = express.Router()

batches.get('/',
  permission.getCheckScopesMiddleware(['batches.find']),
  formatters.validateQuery(findBatchesQuery),
  wrap(async (req, res, next) => {
    const { validAt, expiredAt, page, size } = req.query
    const foundBatches = await batchFinder.findBetweenValidTime(validAt, expiredAt, {
      page,
      size
    })
    const response = await formatters.validate(foundBatches, findBatchesResponse)
    res.json(response)
  })
)

batches.post('/', permission.getCheckScopesMiddleware(['batches.create']), wrapper({
  body: joi.object().keys({
    num: joi.number().integer().min(1).required(),
    amount: joi.number().integer().min(1).required(),
    description: joi.string().trim().min(2).max(50).optional(),
    validAt: joi.moment().optional(),
    expiredAt: joi.moment().optional()
  }),
  response: joi.object().keys({
    code: joi.string()
  }),
  handler (req, res) {
    return batch.createBatch(req.user.adminId, req.body)
  }
}))

batches.get('/codes',
  permission.getCheckScopesMiddleware(['batches.find']),
  formatters.validateQuery(findCodesQuery),
  wrap(async (req, res, next) => {
    const foundBatches = await batchFinder.findByCodeTerm(req.query.term, req.query.size)
    const codes = foundBatches.map(batch => batch.code)
    const response = await formatters.validate(codes, findCodesResponse)
    res.json(response)
  })
)

batches.get('/:code',
  permission.getCheckScopesMiddleware(['batches.find']),
  wrap(async (req, res, next) => {
    const foundBatch = await batchFinder.findByCode(req.params.code)
    const response = await formatters.validate(foundBatch, batchResponse)
    res.json(response)
  })
)

batches.get('/:code/vouchers',
  permission.getCheckScopesMiddleware(['batches.find', 'vouchers.find']),
  formatters.validateQuery(paginationQuery),
  wrap(async (req, res, next) => {
    const foundVouchers = await voucherFinder.findByBatchCode(req.params.code, req.query.page, req.query.size)
    if (!foundVouchers || foundVouchers.length === 0) {
      throw httpError(404)
    }

    const response = await formatters.validate(foundVouchers, findVouchersResponse)
    res.json(response)
  })
)

batches.get('/:code/vouchers/count',
  permission.getCheckScopesMiddleware(['batches.find', 'vouchers.find']),
  wrap(async (req, res, next) => {
    const batch = await batchFinder.findByCode(req.params.code)
    if (!batch) {
      throw httpError(404)
    }

    const count = await voucherFinder.countByBatchId(batch.batchId)
    res.json(count)
  })
)

module.exports = batches
