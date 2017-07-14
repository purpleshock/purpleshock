const joi = require('./formatters/joi')
const validate = require('./formatters')

function getRequestValidator (schemas) {
  const { query, body } = schemas

  if (joi.isJoi(query)) {
    return getValidateMiddleware(query, 'query')
  } else if (joi.isJoi(body)) {
    return getValidateMiddleware(body, 'body')
  }
}

function getValidateMiddleware (schema, field) {
  return function validateMiddleware (req, res, next) {
    validate(req[field], schema)
    .then(value => {
      req[field] = value
      next()
    })
    .catch(err => {
      err.status = 400
      next(err)
    })
  }
}

module.exports = {
  requestValidator,
  validateQuery
}
