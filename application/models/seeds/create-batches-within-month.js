const moment = require('moment')
const batch = require('../../services/batch')
const admins = require('../admins')

exports.seed = async knex => {
  const admin = await admins.findByMail('admin@purpleshock.org')

  // create batch in the
  let createdAt = moment()
  const firstDay = moment(createdAt).subtract(1, 'month')
  while (createdAt.diff(firstDay, 'day') > 0) {
    await batch.createBatch(admin.adminId, {
      createdAt,
      num: createdAt.diff(firstDay, 'day'),
      amount: 1000
    })
    createdAt.subtract(1, 'day')
  }
}
