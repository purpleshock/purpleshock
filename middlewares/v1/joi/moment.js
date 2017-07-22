const moment = require('moment')

module.exports = joi => {
  return {
    name: 'moment',
    pre (value, state, options) {
      if (typeof value === 'number' || parseInt(value)) {
        return moment.unix(value)
      } else {
        return moment(value)
      }
    }
  }
}
