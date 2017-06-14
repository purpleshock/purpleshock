const express = require('express')
const wrap = require('../wrap')
const { voucherFinder, batchFinder, permission } = require('../../services')
const formatters = require('../formatters')
const { voucherResponse } = require('../formatters/vouchers')
const { findCodesQuery, findCodesResponse } = require('../formatters/codeTerm')
const httpError = require('../../utils/httpError')

const vouchers = express.Router()

vouchers.get('/codes',
  permission.getCheckScopesMiddleware(['vouchers.find']),
  formatters.validateQuery(findCodesQuery),
  wrap(async (req, res, next) => {
    const foundVouchers = await voucherFinder.findByCodeTerm(req.query.term, req.query.size)
    const codes = foundVouchers.map(voucher => voucher.code)
    const response = await formatters.validate(codes, findCodesResponse)
    res.json(response)
  })
)

vouchers.get('/:code',
  permission.getCheckScopesMiddleware(['vouchers.find']),
  wrap(async (req, res, next) => {
    const voucher = await voucherFinder.findByCode(req.params.code)
    if (!voucher) {
      throw httpError(404)
    }

    const batch = await batchFinder.findById(voucher.batchId)
    const response = await formatters.validate(Object.assign(voucher, {
      batchCode: batch.code
    }), voucherResponse)
    res.json(response)
  })
)

module.exports = vouchers
