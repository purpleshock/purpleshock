module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('wallets', {
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
      type: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      credit: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
    await queryInterface.createTable('walletTransfers', {
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
      srcId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'wallets',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      },
      destId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'wallets',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('walletTransfers')
    await queryInterface.dropTable('wallets')
  }
}
