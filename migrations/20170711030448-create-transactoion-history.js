module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DepositHistories', {
      historyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      playerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Players',
          key: 'playerId'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      voucherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vouchers',
          key: 'voucherId'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DepositHistories')
  }
}
