const moment = require('moment')

module.exports = joi => {
  return {
    name: 'unix',
    pre (value, state, options) {
      if (moment.isMoment(value)) {
        return value.unix()
      } else if (moment.isDate(value)) {
        return moment(value).unix()
      } else {
        const sec = parseInt(value)
        if (!Number.isNaN(sec)) {
          // treat as unix time
          return moment.unix(sec)
        }

        // string format
        const m = moment(value)
        if (m.isValid()) {
          return m.unix()
        } else {
          return null
        }
      }
    }
  }
}
