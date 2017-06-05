module.exports = (sequelize, Sequelize) => sequelize.define('Batch', {
  batchId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  validAt: {
    type: Sequelize.DATE
  },
  expiredAt: {
    type: Sequelize.DATE
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
