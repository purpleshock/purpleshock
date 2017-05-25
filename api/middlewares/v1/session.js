const express = require('express')
const wrap = require('../wrap')
const { registration, token } = require('../../services')

const session = express.Router()

session.post('/uuid', wrap(async (req, res) => {
  const player = await registration.registerUUIdPlayer(req.body)
  const playerToken = await token.grantPlayer(player)
  res.json({
    uuid: player.identity.uuid.uuid,
    token: playerToken
  })
}))

module.exports = session
