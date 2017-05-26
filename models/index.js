const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')

const basename = path.basename(module.filename)

let sequelize
if (config.use_env_constiable) {
  sequelize = new Sequelize(process.env[config.use_env_constiable])
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

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
