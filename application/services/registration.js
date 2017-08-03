const uuid = require('uuid')
const { Admin, Player, UUIdIdentity } = require('../models/dao')
const tokenService = require('./token')
const walletService = require('./wallet')

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
  // create player and identity
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

  // create token
  const token = await tokenService.grantPlayer(player.playerId)

  // link a default wallet
  const walletDto = await walletService.attachNewWallet(player.playerId)

  return Object.assign(player.toJSON(), {
    token,
    wallet: walletDto,
    identity: {
      uuid: uuidIdentity.toJSON()
    }
  })
}

module.exports = {
  registerUUIdPlayer,
  registerAdmin
}
