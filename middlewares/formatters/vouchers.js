const joi = require('./joi')

const voucherResponse = joi.object().keys({
  code: joi.string(),
  batchCode: joi.string(),
  status: joi.voucherStatus(),
  amount: joi.number()
})

module.exports = {
  voucherResponse
}
