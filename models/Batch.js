module.exports = (sequelize, DataTypes) => sequelize.define('Batch', {
  batchId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  validAt: {
    type: DataTypes.DATE
  },
  expiredAt: {
    type: DataTypes.DATE
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
    },
    findBetweenCreationTime (from, to) {
      const { Batch } = sequelize.models

      if (from && to) {
        return Batch.findAll({
          where: {
            createdAt: { $between: [from, to] }
          }
        })
      } else if (from) {
        return Batch.findAll({
          where: {
            createdAt: { $gte: from }
          }
        })
      } else if (to) {
        return Batch.findAll({
          where: {
            createdAt: { $lte: to }
          }
        })
      } else {
        throw new Error('Invalid duration')
      }
    }
  }
})
