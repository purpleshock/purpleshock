const uuid = require('uuid')
const { Player, UUIdIdentity } = require('../models')

async function registerUUIdPlayer (playerInfo) {
  const now = new Date()
  const player = await Player.create({
    createdAt: now,
    loginAt: now,
    displayName: playerInfo.displayName
  })
  const uuidIdentity = await UUIdIdentity.create({
    uuid: uuid.v4()
  })
  await player.setUUIdIdentity(uuidIdentity)

  return Object.assign(player.toJSON(), {
    identity: {
      uuid: uuidIdentity.toJSON()
    }
  })
}

module.exports = {
  registerUUIdPlayer
}
