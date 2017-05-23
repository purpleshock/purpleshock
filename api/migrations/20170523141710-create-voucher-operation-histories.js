const voucherStatus = require('../consts/voucherStatus')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('voucherHistories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      playerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      },
      voucherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vouchers',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      },
      operatedAt: {
        type: Sequelize.DATE
      }
    })
    await queryInterface.createTable('voucherStatusHistories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
      },
      voucherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vouchers',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      },
      operatedAt: {
        type: Sequelize.DATE
      },
      fromStatus: {
        type: Sequelize.ENUM(
          voucherStatus.INITIALIZED,
          voucherStatus.ACTIVATED,
          voucherStatus.DEACTIVATED,
          voucherStatus.CONSIGNED,
          voucherStatus.SOLD
        ),
        allowNull: false
      },
      toStatus: {
        type: Sequelize.ENUM(
          voucherStatus.INITIALIZED,
          voucherStatus.ACTIVATED,
          voucherStatus.DEACTIVATED,
          voucherStatus.CONSIGNED,
          voucherStatus.SOLD
        ),
        allowNull: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('voucherStatusHistories')
    await queryInterface.dropTable('voucherHistories')
  }
}
