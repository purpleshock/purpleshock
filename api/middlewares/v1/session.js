const express = require('express')
const { registration, token } = require('../../services')

const session = express.Router()

session.post('/uuid', async function (req, res, next) {
  try {
    const player = await registration.registerUUIdPlayer(req.body)
    const playerToken = await token.grantPlayer(player)
    res.json({
      uuid: player.identity.uuid.uuid,
      token: playerToken
    })
  } catch (err) {
    next(err)
  }
})

module.exports = session
