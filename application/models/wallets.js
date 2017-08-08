const knex = require('./knex')
const purify = require('../utils/purify')

function create (playerId, balance = 0) {
  return knex
    .insert({
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
    .from('wallets')
    .where({
      playerId
    })
    .then(([wallet]) => wallet)
}

const updateDataPurifier = purify.getPropertiesFilterFn('balance')

function update (walletId, nextData) {
  nextData = updateDataPurifier(nextData)
  return knex('wallets')
    .update(nextData)
    .where('walletId', walletId)
    .then(numRows => {
      if (numRows === 0) {
        const err = new Error('Update failed')
        return Promise.reject(err)
      } else {
        return Object.assign(nextData, {
          walletId
        })
      }
    })
}

module.exports = {
  create,
  findByOwner,
  update
}
