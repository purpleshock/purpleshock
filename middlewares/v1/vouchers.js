const express = require('express')
const wrap = require('../wrap')
const { voucherFinder, permission } = require('../../services')
const formatters = require('../formatters')
const { findVoucherCodesQuery, findVoucherCodesResponse } = require('../formatters/vouchers')

const vouchers = express.Router()

vouchers.get('/codes',
  permission.getCheckScopesMiddleware(['vouchers.find']),
  formatters.validateQuery(findVoucherCodesQuery),
  wrap(async (req, res, next) => {
    const foundVouchers = await voucherFinder.findByCodeTerm(req.query.term, req.query.size)
    const codes = foundVouchers.map(voucher => voucher.code)
    const response = await formatters.validate(codes, findVoucherCodesResponse)
    res.json(response)
  })
)

module.exports = vouchers
