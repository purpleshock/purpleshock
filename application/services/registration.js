const uuid = require('uuid')
const { Admin, Player, UUIdIdentity } = require('../models/dao')
const admins = require('../models/admins')
const encrypt = require('../models/encrypt')
const permission = require('./permission')
const tokenService = require('./token')
const walletService = require('./wallet')

const MAIL_EXIST = 'MAIL_EXIST'

async function registerAdmin (mail, plainPassword) {
  // check if mail exist
  const existUser = await admins.findByMail(mail)
  if (existUser) {
    throw new Error(MAIL_EXIST)
  }

  const hashPassword = await encrypt.generateHash(plainPassword)
  const userId = await admins.create(mail, hashPassword)
  const scopes = await permission.getAdminScopes(userId)
  const adminToken = await tokenService.grantAdmin(userId, scopes)
  return {
    token: adminToken
  }
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
  MAIL_EXIST,
  registerUUIdPlayer,
  registerAdmin
}
