const Joi = require('joi')

const defaultOption = {
  skipFunctions: true,
  stripUnknown: true
}

const TYPE_MAIL = Joi.string().email()

const TYPE_PWD = Joi.string().trim().min(5).max(20)

const TYPE_MAIL_PWD = Joi.object().keys({
  mail: TYPE_MAIL,
  password: TYPE_PWD
})

function validate (value, schema) {
  return new Promise((resolve, reject) => {
    Joi.validate(value, schema, defaultOption, (err, extractValue) => {
      if (err) {
        reject(err)
      } else {
        resolve(extractValue)
      }
    })
  })
}

module.exports = {
  TYPE_MAIL,
  TYPE_PWD,
  TYPE_MAIL_PWD,
  validate
}
