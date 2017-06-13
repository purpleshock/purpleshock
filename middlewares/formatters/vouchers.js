const joi = require('./joi')

const voucherResponse = joi.object().keys({
  code: joi.string(),
  batchCode: joi.string(),
  status: joi.voucherStatus(),
  amount: joi.number()
})

const findVoucherCodesQuery = joi.object().keys({
  term: [joi.equal(null).strip(), joi.string()],
  size: joi.number().integer().positive().required()
})

const findVoucherCodesResponse = joi.array().items(
  joi.string()
)

module.exports = {
  voucherResponse,
  findVoucherCodesQuery,
  findVoucherCodesResponse
}
