const joi = require('./joi')

const findVouchersQuery = joi.object().keys({
  page: joi.number().integer().positive().required(),
  size: joi.number().integer().positive().required(),
  validAt: joi.moment().optional(),
  expiredAt: joi.moment().optional()
})

const findVouchersResponse = joi.object().keys({
  numTotal: joi.number().integer(),
  batches: joi.array().items(
    joi.object().keys({
      num: joi.number().integer(),
      amount: joi.number(),
      description: joi.string(),
      validAt: joi.unix(),
      expiredAt: joi.unix()
    })
  )
})

const createVcouhersBody = joi.object().keys({
  num: joi.number().integer().min(1).required(),
  amount: joi.number().integer().min(1).required(),
  description: joi.string().trim().min(2).max(50).optional(),
  validAt: joi.moment().optional(),
  expiredAt: joi.moment().optional()
})

const createVouchersResponse = joi.object().keys({
  batchId: joi.number().integer(),
  createdAt: joi.unix(),
  validAt: joi.unix(),
  expiredAt: joi.unix()
})

module.exports = {
  findVouchersQuery,
  findVouchersResponse,
  createVcouhersBody,
  createVouchersResponse
}
