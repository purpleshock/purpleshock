const joi = require('../../../joi')

const paginationQuery = joi.object().keys({
  page: joi.number().integer().positive().required(),
  size: joi.number().integer().positive().required()
})

module.exports = {
  paginationQuery
}
