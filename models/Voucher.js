module.exports = (sequelize, DataTypes) => sequelize.define('Voucher', {
  voucherId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  classMethods: {
    associate (models) {
      const { Batch, Voucher } = models
      Voucher.belongsTo(Batch, {
        foreignKey: 'batchId'
      })
    }
  }
})
