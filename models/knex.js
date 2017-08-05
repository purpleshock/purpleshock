const knexConfig = require('./knexfile')

const env = process.env.NODE_ENV || 'development'
module.exports = require('knex')(knexConfig[env])
