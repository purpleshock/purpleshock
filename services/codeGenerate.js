const uuid = require('uuid')

module.exports = {
  getCode () {
    return uuid.v4()
  }
}
