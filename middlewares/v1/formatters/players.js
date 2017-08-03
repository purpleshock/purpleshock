const joi = require('../joi')

const registerUUIdPlayerBody = joi.object({
  displayName: joi.string()
})

const registerUUIdPlayerResponse = joi.object({
  uuid: joi.string(),
  token: joi.string()
})

const exchangeTokenBody = joi.object({
  uuid: joi.string()
})

const exchangeTokenResponse = joi.object({
  token: joi.string()
})

module.exports = {
  registerUUIdPlayerBody,
  registerUUIdPlayerResponse,
  exchangeTokenBody,
  exchangeTokenResponse
}
