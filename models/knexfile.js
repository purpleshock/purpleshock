const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
})

const migrationDir = path.resolve(__dirname, './migrations')
const seedsDir = path.resolve(__dirname, './seeds')

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    migrations: {
      directory: migrationDir
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
    seeds: {
      directory: seedsDir
    },
    migrations: {
      directory: migrationDir
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
