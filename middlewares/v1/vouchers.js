const express = require('express')
const wrapper = require('../wrapper')
const voucherFinder = require('../../services/voucherFinder')
const batchFinder = require('../../services/batchFinder')
const permission = require('../../services/permission')
const formatters = require('./formatters/vouchers')
const httpError = require('../../utils/httpError')

const vouchers = express.Router()

vouchers.get('/codes', permission.getCheckScopesMiddleware(['vouchers.find']), wrapper({
  query: formatters.findCodesQuery,
  response: formatters.findCodesResponse,
  async handler (req, res) {
    const { term, size } = req.query
    const foundedVouchers = await voucherFinder.findByCodeTerm(term, size)
    return foundedVouchers.map(voucher => voucher.code)
  }
}))

vouchers.get('/:code', permission.getCheckScopesMiddleware(['vouchers.find']), wrapper({
  async handler (req, res) {
    const { code } = req.params

    const voucher = await voucherFinder.findByCode(code)
    if (!voucher) {
      throw httpError(404)
    }

    const batch = await batchFinder.findById(voucher.batchId)
    return Object.assign(voucher, {
      batch: batch.code
    })
  }
}))

module.exports = vouchers
