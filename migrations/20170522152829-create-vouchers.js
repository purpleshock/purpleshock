module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Batches', {
      batchId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      adminId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Admins',
          key: 'adminId'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        unique: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
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
    })

    await queryInterface.createTable('Vouchers', {
      voucherId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      batchId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Batches',
          key: 'batchId'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
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
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Vouchers')
    await queryInterface.dropTable('Batches')
  }
}
