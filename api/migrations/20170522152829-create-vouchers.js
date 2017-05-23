const voucherStatus = require('../consts/voucherStatus')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('batches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      startAt: {
        type: Sequelize.DATE
      },
      endAt: {
        type: Sequelize.DATE
      },
      adminId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admins',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      }
    })
    await queryInterface.createTable('vouchers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: Sequelize.STRING
      },
      batchId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'batches',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM(
          voucherStatus.INITIALIZED,
          voucherStatus.ACTIVATED,
          voucherStatus.DEACTIVATED,
          voucherStatus.APPLIED
        )
      },
      amount: {
        type: Sequelize.INTEGER
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('vouchers')
    await queryInterface.dropTable('batches')
  }
}
