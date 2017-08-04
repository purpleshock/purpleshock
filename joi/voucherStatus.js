const VoucherStatus = require('../models/VoucherStatus')

module.exports = joi => {
  return {
    name: 'voucherStatus',
    base: joi.alternatives().try(
      joi.string(),
      joi.number().min(0).max(VoucherStatus.getAvailableStatus().length - 1)
    ),
    pre (value, state, options) {
      if (typeof value === 'string') {
        return VoucherStatus.fromStatusToIndex(value)
      } else if (typeof value === 'number') {
        return VoucherStatus.fromIndexToStatus(value)
      }
    }
  }
}
