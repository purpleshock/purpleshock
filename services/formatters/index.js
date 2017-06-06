const joi = require('./joi')
const vouchers = require('./vouchers')

function validate (value, schema) {
  return new Promise((resolve, reject) => {
    joi.validate(value, schema, { stripUnknown: true }, (err, value) => {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  })
}

function getValidateMiddleware (schema, resolver) {
  return function bodyValidateMiddleware (req, res, next) {
    validate(resolver(req), schema)
    .then(value => {
      req.body = value
      next()
    })
    .catch(err => {
      next(err)
    })
  }
}

function valdateBody (schema) {
  return getValidateMiddleware(schema, req => req.body)
}

function validateQuery (schema) {
  return getValidateMiddleware(schema, req => req.query)
}

module.exports = {
  vouchers,
  validate,
  valdateBody,
  validateQuery
}
