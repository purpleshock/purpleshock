const joi = require('../joi')

const findCodesQuery = joi.object().keys({
  term: [joi.equal(null).strip(), joi.string()],
  size: joi.number().integer().positive().required()
})

const findCodesResponse = joi.array().items(
  joi.string()
)

module.exports = {
  findCodesQuery,
  findCodesResponse
}
