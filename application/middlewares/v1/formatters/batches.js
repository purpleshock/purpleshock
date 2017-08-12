const joi = require('../../../joi')

const getBatchResponse = joi.object().keys({
  code: joi.string(),
  description: [joi.equal(null).strip(), joi.string()],
  createdAt: [joi.equal(null).strip(), joi.unix().optional()],
  validAt: [joi.equal(null).strip(), joi.unix().optional()],
  expiredAt: [joi.equal(null).strip(), joi.unix().optional()]
})

const searchByTimeQuery = joi.alternatives().try(
  joi.object().keys({
    page: joi.number().integer().positive().required(),
    size: joi.number().integer().positive().required(),
    validAt: joi.moment().required(),
    expiredAt: joi.moment().required()
  }),
  joi.object().keys({
    page: joi.number().integer().positive().required(),
    size: joi.number().integer().positive().required(),
    createDateFrom: joi.moment().required(),
    createDateTo: joi.moment().required()
  })
)

const searchByTimeResponse = joi.array().items(getBatchResponse)

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

const getCodeSuggestionQuery = joi.object().keys({
  term: joi.string(),
  size: joi.number().integer().positive().required()
})

const getCodeSuggestionResponse = joi.array().items(
  joi.string()
)

const countQuery = joi.object().keys({
  validAt: joi.unix().optional(),
  expiredAt: joi.unix().optional()
})

const countReponse = joi.number()

const getBelongedVouchersQuery = joi.object({
  page: joi.number().integer().positive().required(),
  size: joi.number().integer().positive().required()
})

const getBelongedVouchersResponse = joi.array().items(
  joi.object({
    code: joi.string(),
    status: joi.voucherStatus(),
    amount: joi.number(),
    num: joi.number()
  })
)

module.exports = {
  getBatchResponse,
  searchByTimeQuery,
  searchByTimeResponse,
  createBatchBody,
  createBatchResponse,
  getCodeSuggestionQuery,
  getCodeSuggestionResponse,
  countQuery,
  countReponse,
  getBelongedVouchersQuery,
  getBelongedVouchersResponse
}
