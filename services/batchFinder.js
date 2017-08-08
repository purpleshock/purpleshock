const batches = require('../models/batches')

const MISSING_DURATION_QUERY = 'MISSING_DURATION_QUERY'

async function findBetweenValidTime (validAt, expiredAt, page, pagination) {
  let numTotal, found
  const offset = (page - 1) * pagination
  if (validAt && expiredAt) {
    [numTotal, found] = await Promise.all([
      batches.countBetweenValidDuration(validAt, expiredAt),
      batches.findBetweenValidDuration(validAt, expiredAt, offset, pagination)
    ])
  } else if (validAt) {
    [numTotal, found] = await Promise.all([
      batches.countAfterValidTime(validAt),
      batches.findAfterValidTime(validAt, offset, pagination)
    ])
  } else if (expiredAt) {
    [numTotal, found] = await Promise.all([
      batches.countBeforeExpiredTime(expiredAt),
      batches.findBeforeExpiredTime(expiredAt, offset, pagination)
    ])
  } else {
    throw new Error(MISSING_DURATION_QUERY)
  }

  return {
    numTotal,
    batches: found
  }
}

function findByCode (code) {
  return batches.findByCode(code)
}

function findByCodeTerm (term, size) {
  return batches.findByCodeTerm(term, size)
}

module.exports = {
  MISSING_DURATION_QUERY,
  findBetweenValidTime,
  findByCode,
  findByCodeTerm
}
