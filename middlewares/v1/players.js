const express = require('express')
const httpError = require('../../utils/httpError')
const wrap = require('../wrap')
const { registration, finder, token } = require('../../services')

const players = express.Router()

players.use('/:loginMethod', (req, res, next) => {
  switch (req.params.loginMethod) {
    case 'uuid':
      return next()
    default:
      const err = httpError(400, 'Login method is not supported')
      return next(err)
  }
})

players.post('/uuid', wrap(async (req, res) => {
  const playerDto = await registration.registerUUIdPlayer(req.body)
  res.json({
    uuid: playerDto.identity.uuid.uuid,
    token: playerDto.token
  })
}))

players.post('/uuid/session', wrap(async (req, res) => {
  const { uuid } = req.body

  // use uuid as login method
  const player = await finder.findUUIdPlayer(uuid)
  if (player) {
    const playerToken = await token.grantPlayer(player)
    res.json({
      token: playerToken
    })
  } else {
    throw httpError(404)
  }
}))

module.exports = players
