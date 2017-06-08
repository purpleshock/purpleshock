const moment = require('moment')

module.exports = joi => {
  return {
    name: 'unix',
    pre (value, state, options) {
      if (moment.isMoment(value)) {
        return value.unix()
      } else if (moment.isDate(value)) {
        return moment(value).unix()
      } else if (typeof value === 'string') {
        const m = moment(value)
        if (m.isValid()) {
          return m.unix()
        } else {
          return null
        }
      } else {
        return null
      }
    }
  }
}
