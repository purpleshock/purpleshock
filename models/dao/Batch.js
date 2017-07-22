const moment = require('moment')

module.exports = (sequelize, Sequelize) => sequelize.define('Batch', {
  batchId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: Sequelize.STRING,
    unique: true
  },
  validAt: {
    type: Sequelize.DATE
  },
  expiredAt: {
    type: Sequelize.DATE
  },
  description: {
    type: Sequelize.STRING
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
    countBetweenValidDuration (validAt, expiredAt) {
      return this.count({
        where: {
          validAt: { $gte: validAt.toDate() },
          expiredAt: { $lte: expiredAt.toDate() }
        }
      })
    },
    countAfterValidTime (validAt) {
      return this.count({
        where: {
          validAt: { $gte: validAt.toDate() }
        }
      })
    },
    countBeforeExpiredTime (expiredAt) {
      return this.count({
        where: {
          expiredAt: { $lte: expiredAt.toDate() }
        }
      })
    }
  }
})
