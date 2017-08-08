const knex = require('./knex')

function createWithUUId (uuid) {
  const now = new Date()
  return knex
    .insert({
      createdAt: now,
      loginAt: now
    })
    .into('players')
    .then(([playerId]) => {
      return knex.insert({
        uuid,
        playerId
      })
      .into('uuidIdentities')
      .then(() => {
        return {
          createdAt: now,
          loginAt: now,
          uuid,
          playerId
        }
      })
    })
}

function select () {
  return knex
    .select('players.*', 'uuidIdentities.uuid AS uuid')
    .from('players')
    .innerJoin('uuidIdentities', 'players.playerId', 'uuidIdentities.playerId')
}

function findByUUId (uuid) {
  return select()
    .where('uuidIdentities.uuid', uuid)
    .then(([player]) => player)
}

module.exports = {
  createWithUUId,
  findByUUId
}
