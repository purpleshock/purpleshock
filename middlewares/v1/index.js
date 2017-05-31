const express = require('express')
const { permission } = require('../../services')

const api = express.Router()

api.use('/admins', require('./admins'))
api.use('/players', require('./players'))
api.use(permission.getCheckTokenMiddleware())
api.use('/me', require('./me'))
api.use('/vouchers', require('./vouchers'))

module.exports = api
