const uuid = require('uuid')

function getCode () {
  return uuid.v4()
}

module.exports = {
  getCode
}
