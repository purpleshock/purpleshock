module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      playerId: {
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

    await queryInterface.createTable('UUIdIdentities', {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      playerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'playerId'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UUIdIdentities')
    await queryInterface.dropTable('Players')
  }
}
