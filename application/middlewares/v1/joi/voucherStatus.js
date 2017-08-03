const voucherStatus = require('../../../consts/voucherStatus')

module.exports = joi => {
  return {
    name: 'voucherStatus',
    pre (value, state, options) {
      return voucherStatus[value]
    }
  }
}
