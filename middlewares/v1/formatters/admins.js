const joi = require('../joi')

const registerAdminBody = joi.object({
  mail: joi.string().email().required(),
  password: joi.string().trim().min(5).max(20)
})

const registerAdminResponse = joi.object({
  token: joi.string()
})

module.exports = {
  registerAdminBody,
  registerAdminResponse,
  exchangeTokenBody: registerAdminBody,
  exchangeTokenResponse: registerAdminResponse
}
