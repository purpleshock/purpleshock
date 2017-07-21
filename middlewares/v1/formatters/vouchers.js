const joi = require('../joi')

const voucherResponse = joi.object().keys({
  code: joi.string(),
  batchCode: joi.string(),
  status: joi.voucherStatus(),
  amount: joi.number()
})

const findVouchersQuery = joi.object().keys({
  term: joi.string(),
  size: joi.number()
})

const findVouchersResponse = joi.array().items(
  joi.object().keys({
    code: joi.string(),
    status: joi.voucherStatus(),
    amount: joi.number()
  })
)

module.exports = {
  voucherResponse,
  findVouchersQuery,
  findVouchersResponse
}
