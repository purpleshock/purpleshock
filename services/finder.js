const { Admin, Player, UUIdIdentity } = require('../models/dao')

async function findAdminByMail (mail, password) {
  const admin = await Admin.findOne({
    where: { mail }
  })

  if (admin && (await admin.comparePlainPassword(password))) {
    return admin.toJSON()
  } else {
    return null
  }
}

async function findAdminByAdminId (adminId) {
  const admin = await Admin.findById(adminId)
  return admin ? admin.toJSON() : null
}

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

async function findPlayerByPlayerId (playerId) {
  const player = await Player.findById(playerId)
  return player ? player.toJSON() : null
}

module.exports = {
  findAdminByMail,
  findAdminByAdminId,
  findUUIdPlayer,
  findPlayerByPlayerId
}
