const knex = require('./knex')

function select () {
  return knex
    .select('deposits.*', 'vouchers.code', 'vouchers.amount')
    .from('deposits')
    .innerJoin('vouchers', 'vouchers.voucherId', 'deposits.voucherId')
}

function create (playerId, voucherId) {
  return knex.insert({
    playerId,
    voucherId,
    createdAt: new Date()
  })
  .into('deposits')
}

function findByOwnerAndCreationDuration (ownerId, from, to, index, count) {
  return select()
    .where('deposits.playerId', ownerId)
    .where('deposits.playerId', ownerId)
    .andWhere('deposits.createdAt', '>=', from.toDate())
    .andWhere('deposits.createdAt', '<=', to.toDate())
    .limit(count)
    .offset(index)
}

function findByVoucherCode (code) {
  return select()
    .where('vouchers.code', code)
}

module.exports = {
  create,
  findByOwnerAndCreationDuration,
  findByVoucherCode
}
