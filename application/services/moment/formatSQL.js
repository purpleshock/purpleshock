const moment = require('moment')

moment.fn.formatSQL = function () {
  return this.format('YYYY-MM-DD HH:mm:ss')
}
