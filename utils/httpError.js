const http = require('http')

module.exports = function httpError (code, message) {
  const err = new Error(message || http.STATUS_CODES[code])
  err.status = code
  return err
}
