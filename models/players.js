const knex = require('./knex')

function createWithUUId (uuid) {
  const now = new Date()
  return knex.insert({
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

function findByUUId (uuid) {
  return knex.select()
  .from('uuidIdentities')
  .where('uuid', uuid)
  .then(([uuidIdentity]) => {
    if (uuidIdentity) {
      return knex.select()
      .from('players')
      .where('playerId', uuidIdentity.playerId)
      .then(player => {
        return {
          createdAt: player.createdAt,
          loginAt: player.loginAt,
          uuid,
          playerId: player.playerId
        }
      })
    }
  })
}

module.exports = {
  createWithUUId,
  findByUUId
}
