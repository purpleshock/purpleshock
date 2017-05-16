module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('voucherBatches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
    await queryInterface.createTable('vouchers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      batchId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'voucherBatches',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM(
          'Initialized',  // Initialized, but cannot be applied
          'Activated',    // Could be applied
          'Applied'
        ),
        allowNull: false
      }
    })
    await queryInterface.createTable('depositHistory', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      voucherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'vouchers',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('depositHistory')
    await queryInterface.dropTable('vouchers')
    await queryInterface.dropTable('voucherBatches')
  }
}
