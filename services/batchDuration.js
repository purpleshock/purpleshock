const { Batch } = require('../models/dao')

function countByValidDuration (validAt, expiredAt) {
  if (validAt && expiredAt) {
    return Batch.countBetweenValidDuration(validAt, expiredAt)
  } else if (validAt) {
    return Batch.countAfterValidTime(validAt)
  } else if (expiredAt) {
    return Batch.countBeforeExpiredTime(expiredAt)
  } else {
    throw new Error(`should provide validAt or expiredAt`)
  }
}

module.exports = {
  countByValidDuration
}
