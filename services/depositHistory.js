const { DepositHistory } = require('../models/dao')

const NO_HISTORY = 'no_history_in_range'

async function insertNewRecord (playerId, voucherId) {
  const history = await DepositHistory.create({
    playerId,
    voucherId
  })

  return history.toJSON()
}

async function findBetween (playerId, from, to, page, pagination) {
  const histories = await DepositHistory.findByOwnerAndCreationTime(playerId, from, to, page - 1, pagination)
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
