const uuid = require('uuid')
const { Admin, Player, UUIdIdentity } = require('../models/dao')
const admins = require('../models/admins')
const players = require('../models/players')
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

async function registerUUIdPlayer () {
  // create player and identity
  const userUUId = uuid.v4()
  const user = await players.createWithUUId(userUUId)
  // link a default wallet
  const wallet = await walletService.attachNewWallet(user.playerId)
  // create token
  const token = await tokenService.grantPlayer(user.playerId)

  return Object.assign(user, {
    wallet,
    token
  })
}

module.exports = {
  MAIL_EXIST,
  registerUUIdPlayer,
  registerAdmin
}
