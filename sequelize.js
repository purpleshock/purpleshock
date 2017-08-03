require('dotenv').config()

module.exports = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_NAME,
  storage: process.env.DB_STORAGE,
  username: process.env.DB_USER,
  password: process.env.DB_PWD
}
