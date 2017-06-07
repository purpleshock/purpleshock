const moment = require('moment')

module.exports = joi => {
  return {
    name: 'unix',
    pre (value, state, options) {
      return moment.unix(value)
    }
  }
}
