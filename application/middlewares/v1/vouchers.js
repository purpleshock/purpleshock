const express = require('express')
const wrapper = require('../wrapper')
const voucherFinder = require('../../services/voucherFinder')
const permission = require('../../services/permission')
const formatters = require('./formatters/vouchers')
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
  errors: {
    [voucherFinder.CODE_NOT_EXIST]: 404
  },
  handler (req, res) {
    const { term, size } = req.query
    return voucherFinder.findByCodeTerm(term, size)
  }
}))

vouchers.use('/:code', require('./vouchers/code'))

module.exports = vouchers
