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
    findBetweenCreationTime (duration, pagination) {
      const { Batch } = sequelize.models
      const { from, to } = duration
      const { page, size } = pagination

      const where = {}
      if (from && to) {
        where.createdAt = { $between: [from, to] }
      } else if (from) {
        where.createdAt = { $gte: from }
      } else if (to) {
        where.createdAt = { $lte: to }
      }

      return Batch.findAll({
        where,
        limit: size,
        offset: (page - 1) * size
      })
    },
    findBetweenValidTime (duration, pagination) {
      const { Batch } = sequelize.models
      const { from, to } = duration
      const { page, size } = pagination

      const where = {}
      if (from && to) {
        where.validAt = { $gte: from }
        where.expiredAt = { $lte: to }
      } else if (from) {
        where.validAt = { $gte: from }
      } else if (to) {
        where.expiredAt = { $lte: to }
      }

      return Batch.findAll({
        where,
        limit: size,
        offset: (page - 1) * size
      })
    }
  }
})
