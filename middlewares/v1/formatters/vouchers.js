const joi = require('../joi')

const voucherEntity = joi.object({
  code: joi.string(),
  batch: joi.string(),
  status: joi.string(),
  amount: joi.number()
})

const findCodesQuery = joi.object({
  term: [joi.equal(null).strip(), joi.string()],
  size: joi.number().integer().positive().required()
})

const findCodesResponse = joi.array().items(voucherEntity)

module.exports = {
  voucherEntity,
  findCodesQuery,
  findCodesResponse
}
