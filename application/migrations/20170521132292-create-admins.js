module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      adminId: {
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
      mail: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Admins')
  }
}
