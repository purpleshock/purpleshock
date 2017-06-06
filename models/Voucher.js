module.exports = (sequelize, Sequelize) => sequelize.define('Voucher', {
  voucherId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: Sequelize.STRING,
    unique: true
  },
  amount: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false,
  classMethods: {
    associate (models) {
      const { Batch, Voucher } = models
      Voucher.belongsTo(Batch, {
        foreignKey: 'batchId'
      })
    }
  }
})
