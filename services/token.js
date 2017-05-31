const jwt = require('jsonwebtoken')
const config = require('../config')

function sign (payload, secret) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, (err, token) => {
      return err ? reject(err) : resolve(token)
    })
  })
}

function verify (token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, ret) => {
      return err ? reject(err) : resolve(ret)
    })
  })
}

function grantPlayer (player) {
  return sign(player, config.jwt.secret)
}

function grantAdmin (admin) {
  return sign(admin, config.jwt.secret)
}

function extractToken (token) {
  return verify(token, config.jwt.secret)
}

module.exports = {
  grantPlayer,
  grantAdmin,
  extractToken
}
