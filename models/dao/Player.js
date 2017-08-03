module.exports = (sequelize, Sequelize) => sequelize.define('Player', {
  playerId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: {
    type: Sequelize.DATE
  },
  loginAt: {
    type: Sequelize.DATE
  },
  displayName: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,
  classMethods: {
    associate (models) {
      const { Player, UUIdIdentity, Wallet } = models
      Player.hasOne(UUIdIdentity, {
        foreignKey: 'playerId'
      })
      Player.hasOne(Wallet, {
        foreignKey: 'playerId'
      })
    }
  }
})
