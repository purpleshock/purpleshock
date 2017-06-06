module.exports = (sequelize, Sequelize) => sequelize.define('UUIdIdentity', {
  uuid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  playerId: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
})
