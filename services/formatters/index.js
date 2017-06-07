const joi = require('./joi')
const vouchers = require('./vouchers')

const validateOptions = {
  stripUnknown: true,
  convert: true
}

function validate (value, schema) {
  return new Promise((resolve, reject) => {
    joi.validate(value, schema, validateOptions, (err, value) => {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  })
}

function getValidateMiddleware (schema, field) {
  return function bodyValidateMiddleware (req, res, next) {
    validate(req[field], schema)
    .then(value => {
      req[field] = value
      next()
    })
    .catch(err => {
      next(err)
    })
  }
}

function valdateBody (schema) {
  return getValidateMiddleware(schema, 'body')
}

function validateQuery (schema) {
  return getValidateMiddleware(schema, 'query')
}

module.exports = {
  vouchers,
  validate,
  valdateBody,
  validateQuery
}
