const express = require('express')
const wrapper = require('../../wrapper')
const voucher = require('../../../services/voucher')
const voucherFinder = require('../../../services/voucherFinder')
const permission = require('../../../services/permission')
const formatters = require('../formatters/vouchers')
const httpError = require('../../../utils/httpError')

const router = express.Router({
  mergeParams: true
})

router.use(permission.getCheckScopesMiddleware(['vouchers.find']), async (req, res, next) => {
  const voucher = await voucherFinder.findByCode(req.params.code)
  if (voucher) {
    res.locals.voucher = voucher
    next()
  } else {
    return next(httpError(404))
  }
})

router.get('/', wrapper({
  handler (req, res) {
    return res.locals.voucher
  }
}))

router.put('/', permission.getCheckScopesMiddleware(['vouchers.modify']), wrapper({
  body: formatters.editVoucherBody,
  errors: {
    [voucher.ILLEGAL_STATUS_OPERATION]: 405
  },
  handler (req, res) {
    return voucher.updateVoucher(res.locals.voucher, req.body)
  }
}))

router.get('/available-status', (req, res) => {
  const availableStatus = voucher.getAvailableStatus(res.locals.voucher.status)
  res.json(availableStatus)
})

module.exports = router
