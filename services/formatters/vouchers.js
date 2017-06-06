const joi = require('./joi')

const createBody = joi.object().keys({
  num: joi.number().integer().min(1).required(),
  amount: joi.number().integer().min(1).required(),
  description: joi.string().trim().min(2).max(50).optional(),
  validAt: joi.moment().optional(),
  expiredAt: joi.moment().optional()
})

module.exports = {
  createBody
}
