const express = require('express')
const { permission } = require('../../services')

const api = express.Router()

api.use('/admins', require('./admins'))
api.use('/players', require('./players'))
api.use(permission.getCheckTokenMiddleware())
api.use('/me', require('./me'))
api.use('/batches', require('./batches'))
api.use('/vouchers', require('./vouchers'))
api.use('/deposit', require('./deposit'))

module.exports = api
