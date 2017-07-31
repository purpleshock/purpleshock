const express = require('express')
const wrapper = require('../wrapper')
const voucherFinder = require('../../services/voucherFinder')
const batchFinder = require('../../services/batchFinder')
const permission = require('../../services/permission')
const formatters = require('./formatters/vouchers')
const httpError = require('../../utils/httpError')
const VoucherStatus = require('../../models/VoucherStatus')

const vouchers = express.Router()

vouchers.get('/status', permission.getCheckScopesMiddleware(['vouchers.find']), wrapper({
  handler (req, res) {
    return VoucherStatus.getAvailableStatus()
  }
}))

vouchers.get('/', permission.getCheckScopesMiddleware(['vouchers.find']), wrapper({
  query: formatters.findCodesQuery,
  response: formatters.findCodesResponse,
  handler (req, res) {
    const { term, size } = req.query
    return voucherFinder.findByCodeTerm(term, size)
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
