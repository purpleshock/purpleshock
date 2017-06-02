const { Admin } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    const mail = 'admin@purpleshock.org'
    const password = 'password'
    const now = new Date()
    const admin = Admin.build({
      createdAt: now,
      loginAt: now,
      mail
    })
    await admin.setPlainPassword(password)
    await admin.save()
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {})
  }
}
