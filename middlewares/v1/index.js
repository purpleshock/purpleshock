const express = require('express')
const authenticate = require('../authenticate')

const api = express.Router()

api.use('/admins', require('./admins'))
api.use('/players', require('./players'))
api.use(authenticate())

api.use('/me', require('./me'))

module.exports = api
