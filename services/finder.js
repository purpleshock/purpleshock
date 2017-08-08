const admins = require('../models/admins')
const players = require('../models/players')
const encrypt = require('../models/encrypt')
const permission = require('./permission')
const token = require('./token')

const MAIL_NOT_EXIST = 'MAIL_NOT_EXIST'
const INVALID_PASSWORD = 'INVALID_PASSWORD'
const UUID_NOT_EXIST = 'UUID_NOT_EXIST'

async function loginAdmin (mail, plainPassword) {
  // find user and check password
  const user = await admins.findByMail(mail)
  if (!user) {
    throw new Error(MAIL_NOT_EXIST)
  }
  if (!encrypt.equals(plainPassword, user.password)) {
    throw new Error(INVALID_PASSWORD)
  }

  // grant user with scoped token
  const scopes = await permission.getAdminScopes(user.adminId)
  const adminToken = await token.grantAdmin(user.adminId, scopes)
  return {
    token: adminToken
  }
}

async function loginUUIdPlayer (uuid) {
  const user = await players.findByUUId(uuid)
  if (!user) {
    throw new Error(UUID_NOT_EXIST)
  }

  const playerToken = await token.grantPlayer(user.playerId)
  return {
    token: playerToken
  }
}

module.exports = {
  MAIL_NOT_EXIST,
  UUID_NOT_EXIST,
  INVALID_PASSWORD,
  loginAdmin,
  loginUUIdPlayer
}
