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
    const { uuid, token } = await registration.registerUUIdPlayer(req.body)
    return {
      uuid,
      token
    }
  }
}))

players.post('/uuid/session', wrapper({
  body: formatter.exchangeTokenBody,
  response: formatter.exchangeTokenResponse,
  errors: {
    [finder.UUID_NOT_EXIST]: 404
  },
  handler (req, res) {
    return finder.loginUUIdPlayer(req.body.uuid)
  }
}))

module.exports = players
