module.exports = (sequelize, DataTypes) => sequelize.define('UUIdIdentity', {
  uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  playerId: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'uuidIdentity',
  timestamps: false
})
