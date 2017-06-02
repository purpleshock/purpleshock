module.exports = (sequelize, DataTypes) => sequelize.define('Batch', {
  batchId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: true,
  updatedAt: false,
  deletedAt: false,
  classMethods: {
    associate (models) {
      const { Admin, Batch, Voucher } = models

      Batch.belongsTo(Admin, {
        foreignKey: 'adminId'
      })

      Batch.hasMany(Voucher, {
        foreignKey: 'batchId'
      })
    }
  }
})
