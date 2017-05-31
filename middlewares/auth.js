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
    try {
      let user
      if (payload.playerId) {
        user = await finder.findPlayerByPlayerId(payload.playerId)
      } else if (payload.adminId) {
        user = await finder.findAdminByAdminId(payload.adminId)
      }

      if (user) {
        return next(null, user)
      } else {
        throw httpError(404)
      }
    } catch (err) {
      next(err)
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
