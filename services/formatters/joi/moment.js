const moment = require('moment')

module.exports = joi => {
  return {
    name: 'moment',
    pre (value, state, options) {
      return moment(value)
    }
  }
}
