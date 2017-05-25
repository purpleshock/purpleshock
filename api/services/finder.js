const { Player, UUIdIdentity } = require('../models')

async function findUUIdPlayer (uuid) {
  const uuidIdentity = await UUIdIdentity.findOne({
    where: { uuid }
  })

  if (uuidIdentity) {
    const player = await Player.findById(uuidIdentity.playerId)
    return Object.assign(player.toJSON(), {
      identity: {
        uuid: uuidIdentity.toJSON()
      }
    })
  } else {
    return null
  }
}

module.exports = {
  findUUIdPlayer
}
