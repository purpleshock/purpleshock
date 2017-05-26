module.exports = (sequelize, DataTypes) => sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: {
    type: DataTypes.DATE
  },
  loginAt: {
    type: DataTypes.DATE
  },
  displayName: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'players',
  timestamps: false,
  classMethods: {
    associate (models) {
      const { Player, UUIdIdentity } = models
      Player.hasOne(UUIdIdentity, {
        foreignKey: 'playerId'
      })
    }
  }
})
