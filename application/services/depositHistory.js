const deposits = require('../models/deposits')

const NO_HISTORY = 'no_history_in_range'

async function insertNewRecord (playerId, voucherId) {
  return deposits.create(playerId, voucherId)
}

async function findBetween (playerId, from, to, page, pagination) {
  const histories = await deposits.findByOwnerAndCreationDuration(playerId, from, to, page - 1, pagination)
  if (histories.length === 0) {
    throw new Error(NO_HISTORY)
  }
  return histories
}

module.exports = {
  NO_HISTORY,
  insertNewRecord,
  findBetween
}
