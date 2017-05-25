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
  const payload = { id: player.id }
  return sign(payload, config.jwt.secret)
}

async function extractToken (token) {
  return verify(token, config.jwt.secret)
}

module.exports = {
  grantPlayer,
  extractToken
}
