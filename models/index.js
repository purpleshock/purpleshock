const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

function getLogging () {
  return process.env.LOG === 'false' ? false : process.env.LOG
}

const basename = path.basename(module.filename)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
    logging: getLogging()
  }
)

const db = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&  // is hidden file
      file !== basename &&        // is index file
      file.slice(-3) === '.js' && // is javascript file
      file.indexOf('.test') < 0   // is not test file
    )
  })
  .reduce((db, file) => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
    return db
  }, {})

Object
  .values(db)
  .forEach(model => {
    if (model.associate) {
      model.associate(db)
    }
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
