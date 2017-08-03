const express = require('express')
const httpError = require('../../utils/httpError')
const wrapper = require('../wrapper')
const registration = require('../../services/registration')
const finder = require('../../services/finder')
const token = require('../../services/token')
const formatter = require('./formatters/players')

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

players.post('/uuid', wrapper({
  body: formatter.registerUUIdPlayerBody,
  response: formatter.registerUUIdPlayerResponse,
  async handler (req, res) {
    const playerDto = await registration.registerUUIdPlayer(req.body)
    return {
      uuid: playerDto.identity.uuid.uuid,
      token: playerDto.token
    }
  }
}))

players.post('/uuid/session', wrapper({
  body: formatter.exchangeTokenBody,
  response: formatter.exchangeTokenResponse,
  async handler (req, res) {
    const player = await finder.findUUIdPlayer(req.body.uuid)
    if (!player) {
      throw httpError(404)
    }
    const playerToken = await token.grantPlayer(player)
    return {
      token: playerToken
    }
  }
}))

module.exports = players
