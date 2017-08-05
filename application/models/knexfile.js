const path = require('path')

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    migrations: {
      directory: './models/migrations'
    },
    useNullAsDefault: true
  },
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: './models/migrations'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
