const batches = require('../models/batches')

function countByValidDuration (validAt, expiredAt) {
  if (validAt && expiredAt) {
    return batches.countBetweenValidDuration(validAt, expiredAt)
  } else if (validAt) {
    return batches.countAfterValidTime(validAt)
  } else if (expiredAt) {
    return batches.countBeforeExpiredTime(expiredAt)
  } else {
    throw new Error(`should provide validAt or expiredAt`)
  }
}

module.exports = {
  countByValidDuration
}
