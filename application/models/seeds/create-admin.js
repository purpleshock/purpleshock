const registration = require('../../services/registration')

exports.seed = async knex => {
  await registration.registerAdmin('admin@purpleshock.org', 'password')
}
