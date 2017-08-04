const joi = require('../../../joi')

const depositBody = joi.object().keys({
  code: joi.string().required()
})

const depositResponse = joi.object().keys({
  balance: joi.number().required()
})

const getDepositHistoryQuery = joi.object({
  from: joi.unix().required(),
  to: joi.unix().required(),
  page: joi.number().required(),
  pagination: joi.number().required()
})

const getDepositHistoryResponse = joi.array().items(
  joi.object({
    createdAt: joi.unix(),
    code: joi.string(),
    amount: joi.number()
  })
)

module.exports = {
  depositBody,
  depositResponse,
  getDepositHistoryQuery,
  getDepositHistoryResponse
}
