const express = require('express')
const httpError = require('../../utils/httpError')
const wrap = require('../wrap')
const { registration, finder, token } = require('../../services')

const session = express.Router()

session.post('/uuid', wrap(async (req, res) => {
  const player = await registration.registerUUIdPlayer(req.body)
  const playerToken = await token.grantPlayer(player)
  res.json({
    uuid: player.identity.uuid.uuid,
    token: playerToken
  })
}))

session.post('/', wrap(async (req, res) => {
  const { uuid } = req.body

  // use uuid as login method
  if (uuid) {
    const player = await finder.findUUIdPlayer(uuid)
    if (player) {
      const playerToken = await token.grantPlayer(player)
      res.json({
        token: playerToken
      })
    } else {
      throw httpError(404)
    }
  } else {
    throw httpError(400, 'Login method is not supported')
  }
}))

module.exports = session
