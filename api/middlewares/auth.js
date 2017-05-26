const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const httpError = require('../utils/httpError')
const config = require('../config')
const { finder } = require('../services')

module.exports = function () {
  const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.jwt.secret
  }

  passport.use(new Strategy(opt, async (payload, next) => {
    const player = await finder.findPlayerByPlayerId(payload.id)
    if (player) {
      return next(null, player)
    } else {
      return next(httpError(404))
    }
  }))

  return {
    initialize () {
      return passport.initialize()
    },
    authenticate () {
      return passport.authenticate('jwt', {
        session: config.jwt.session
      })
    }
  }
}
