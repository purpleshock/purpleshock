const joi = require('./joi')

const findBatchesQuery = joi.object().keys({
  page: joi.number().integer().positive().required(),
  size: joi.number().integer().positive().required(),
  validAt: joi.moment().optional(),
  expiredAt: joi.moment().optional()
})

const findBatchesResponse = joi.object().keys({
  numTotal: joi.number().integer(),
  batches: joi.array().items(
    joi.object().keys({
      code: joi.string(),
      description: [joi.equal(null).strip(), joi.string()],
      createdAt: [joi.equal(null).strip(), joi.unix().optional()],
      validAt: [joi.equal(null).strip(), joi.unix().optional()],
      expiredAt: [joi.equal(null).strip(), joi.unix().optional()]
    })
  )
})

const createBatchBody = joi.object().keys({
  num: joi.number().integer().min(1).required(),
  amount: joi.number().integer().min(1).required(),
  description: joi.string().trim().min(2).max(50).optional(),
  validAt: joi.moment().optional(),
  expiredAt: joi.moment().optional()
})

const createBatchResponse = joi.object().keys({
  code: joi.string()
})

module.exports = {
  findBatchesQuery,
  findBatchesResponse,
  createBatchBody,
  createBatchResponse
}
