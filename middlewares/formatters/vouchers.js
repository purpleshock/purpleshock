const joi = require('./joi')

const findVoucherCodesQuery = joi.object().keys({
  term: [joi.equal(null).strip(), joi.string()],
  size: joi.number().integer().positive().required()
})

const findVoucherCodesResponse = joi.array().items(
  joi.string()
)

module.exports = {
  findVoucherCodesQuery,
  findVoucherCodesResponse
}
