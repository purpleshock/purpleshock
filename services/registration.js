const uuid = require('uuid')
const { Admin, Player, UUIdIdentity } = require('../models')

async function registerAdmin (mail, password) {
  const now = new Date()
  const admin = Admin.build({
    createdAt: now,
    loginAt: now,
    mail
  })
  await admin.setPlainPassword(password)
  await admin.save()
  return admin.toJSON()
}

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
  registerUUIdPlayer,
  registerAdmin
}
