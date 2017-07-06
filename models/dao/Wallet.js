module.exports = (sequelize, Sequelize) => {
  const Wallet = sequelize.define('Wallet', {
    walletId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    balance: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    playerId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  })

  Wallet.findByOwner = function (playerId) {
    return Wallet.findOne({
      where: { playerId }
    })
  }

  return Wallet
}