module.exports = (sequelize, Sequelize) => {
  const Voucher = sequelize.define('Voucher', {
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
      type: Sequelize.STRING
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

  Voucher.updateByCode = function (code, body) {
    return Voucher.update(body, {
      where: { code }
    })
  }

  Voucher.findByCode = function (code) {
    return Voucher.findOne({
      where: { code }
    })
  }

  Voucher.findCodeLike = function (term, size) {
    return Voucher.findAll({
      attributes: ['code', 'amount', 'status'],
      where: {
        code: {
          $like: term + '%'
        }
      },
      include: {
        model: sequelize.models.Batch,
        attributes: ['code']
      },
      limit: size
    })
  }

  return Voucher
}
