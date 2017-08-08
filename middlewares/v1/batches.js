const express = require('express')
const wrapper = require('../wrapper')
const permission = require('../../services/permission')
const batchFinder = require('../../services/batchFinder')
const voucherFinder = require('../../services/voucherFinder')
const batchDuration = require('../../services/batchDuration')
const batch = require('../../services/batch')
const formatters = require('./formatters/batches')
const httpError = require('../../utils/httpError')

const batches = express.Router()

batches.get('/', permission.getCheckScopesMiddleware(['batches.find']), wrapper({
  query: formatters.searchByTimeQuery,
  response: formatters.searchByTimeResponse,
  handler (req, res) {
    const { validAt, expiredAt, page, size } = req.query
    return batchFinder.findBetweenValidTime(validAt, expiredAt, {
      page,
      size
    })
  }
}))

batches.post('/', permission.getCheckScopesMiddleware(['batches.create']), wrapper({
  body: formatters.createBatchBody,
  response: formatters.createBatchResponse,
  handler (req, res) {
    return batch.createBatch(req.user.adminId, req.body)
  }
}))

batches.get('/codes', permission.getCheckScopesMiddleware(['batches.find']), wrapper({
  query: formatters.getCodeSuggestionQuery,
  response: formatters.getCodeSuggestionResponse,
  async handler (req, res) {
    const foundBatches = await batchFinder.findByCodeTerm(req.query.term, req.query.size)
    return foundBatches.map(batch => batch.code)
  }
}))

batches.get('/count', permission.getCheckScopesMiddleware(['batches.find']), wrapper({
  query: formatters.countQuery,
  response: formatters.countReponse,
  handler (req, res) {
    const { validAt, expiredAt } = req.query
    return batchDuration.countByValidDuration(validAt, expiredAt)
  }
}))

batches.get('/:code', permission.getCheckScopesMiddleware(['batches.find']), wrapper({
  response: formatters.getBatchResponse,
  handler (req, res) {
    return batchFinder.findByCode(req.params.code)
  }
}))

batches.get('/:code/vouchers', permission.getCheckScopesMiddleware(['batches.find', 'vouchers.find']), wrapper({
  query: formatters.getBelongedVouchersQuery,
  response: formatters.getBelongedVouchersResponse,
  async handler (req, res) {
    const { code } = req.params
    const { page, size } = req.query
    const vouchers = await voucherFinder.findByBatch(code, page, size)
    if (vouchers && vouchers.length > 0) {
      return vouchers
    } else {
      throw httpError(404)
    }
  }
}))

batches.get('/:code/vouchers/count', permission.getCheckScopesMiddleware(['batches.find', 'vouchers.find']), wrapper({
  async handler (req, res) {
    return voucherFinder.countByBatch(req.params.code)
  }
}))

module.exports = batches
