const joi = require('./joi')

const findQuery = joi.object().keys({
  page: joi.number().integer().positive().required(),
  size: joi.number().integer().positive().required(),
  validAt: joi.unix().optional(),
  expiredAt: joi.unix().optional()
})

const createBody = joi.object().keys({
  num: joi.number().integer().min(1).required(),
  amount: joi.number().integer().min(1).required(),
  description: joi.string().trim().min(2).max(50).optional(),
  validAt: joi.unix().optional(),
  expiredAt: joi.unix().optional()
})

module.exports = {
  findQuery,
  createBody
}
