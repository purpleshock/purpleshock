const validateOptions = {
  stripUnknown: true,
  convert: true
}

function validate (value, schema) {
  return new Promise((resolve, reject) => {
    schema.validate(value, validateOptions, (err, value) => {
      if (err) {
        reject(err)
      } else {
        resolve(value)
      }
    })
  })
}

module.exports = function wrapper ({
  query,
  body,
  response,
  errors = {},
  handler
}) {
  const reqSchemas = {
    query,
    body
  }

  async function validateRequest (req) {
    for (let key in reqSchemas) {
      const schema = reqSchemas[key]
      if (!schema) {
        continue
      }
      req[key] = await validate(req[key], schema)
    }
    return req
  }

  return async function (req, res, next) {
    try {
      req = await validateRequest(req)
    } catch (err) {
      if (err.name === 'ValidationError') {
        err.status = 400
      }
      return next(err)
    }

    try {
      let result = await handler(req, res)
      if (response) {
        result = await validate(result, response)
      }
      res.json(result)
    } catch (err) {
      err.status = errors[err.message] || 500
      next(err)
    }
  }
}
