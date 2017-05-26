module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      loginAt: {
        type: Sequelize.DATE
      },
      displayName: {
        type: Sequelize.STRING
      }
    })
    await queryInterface.createTable('mailIdentity', {
      mail: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      playerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
    await queryInterface.createTable('facebookIdentity', {
      facebookId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      playerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
    await queryInterface.createTable('uuidIdentity', {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      playerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'players',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('uuidIdentity')
    await queryInterface.dropTable('mailIdentity')
    await queryInterface.dropTable('facebookIdentity')
    await queryInterface.dropTable('players')
  }
}
