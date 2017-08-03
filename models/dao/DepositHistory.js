const moment = require('moment')

module.exports = (sequelize, Sequelize) => {
  const DepositHistory = sequelize.define('DepositHistory', {
    historyId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: {
      type: Sequelize.TIME
    }
  }, {
    timestamps: false,
    classMethods: {
      associate ({
        DepositHistory,
        Voucher,
        Player
      }) {
        DepositHistory.belongsTo(Voucher, {
          foreignKey: 'voucherId'
        })
        DepositHistory.belongsTo(Player, {
          foreignKey: 'playerId'
        })
      },
      createRecord (playerId, voucherId) {
        return DepositHistory.create({
          playerId,
          voucherId,
          createdAt: moment().formatSQL()
        })
      }
    }
  })

  DepositHistory.findByOwnerAndCreationTime = function (ownerId, from, to, index, count) {
    const timeFormatSQL = 'YYYY-MM-DD HH:mm:ss'
    return sequelize.query(`
      SELECT h.*, v.code, v.amount
      FROM DepositHistories h
      JOIN Vouchers v
      WHERE h.playerId = :ownerId
      AND h.voucherId = v.voucherId
      AND h.createdAt >= :from
      AND h.createdAt <= :to
      LIMIT :index, :count
    `, {
      type: sequelize.QueryTypes.SELECT,
      replacements: {
        ownerId,
        from: from.format(timeFormatSQL),
        to: to.format(timeFormatSQL),
        index,
        count
      }
    })
    .then(rows => rows.map(row => {
      row.createdAt = moment(row.createdAt, timeFormatSQL)
      return row
    }))
  }

  return DepositHistory
}
