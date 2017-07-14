const jwt = require('jsonwebtoken')

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

function grantPlayer (playerId) {
  const payload = {
    playerId
  }
  return sign(payload, process.env.JWT_SECRET)
}

function grantAdmin (admin, scopes) {
  const payload = {
    adminId: admin.adminId,
    scopes
  }
  return sign(payload, process.env.JWT_SECRET)
}

function extractToken (token) {
  return verify(token, process.env.JWT_SECRET)
}

module.exports = {
  grantPlayer,
  grantAdmin,
  extractToken
}
