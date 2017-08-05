const knex = require('./knex')

function create (playerId, balance = 0) {
  return knex.insert({
    playerId,
    balance
  })
  .into('wallets')
  .then(([walletId]) => {
    return {
      walletId,
      playerId,
      balance
    }
  })
}

function findByOwner (playerId) {
  return knex.select()
  .from(wallets)
  .where({
    playerId
  })
}

module.exports = {
  create,
  findByOwner
}
