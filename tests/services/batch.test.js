const test = require('ava')
const { sequelize } = require('../../models/dao')
const { registration, batch } = require('../../services')

let admin
test.before(async t => {
  await sequelize.sync({ force: true })
  const mail = 'admin@purpleshock.org'
  const password = 'pass2vv0rd'
  admin = await registration.registerAdmin(mail, password)
})

test.serial('#createBatch', async t => {
  const numVouchers = 10
  const amount = 100
  const createdBatch = await batch.createBatch(admin.adminId, {
    num: numVouchers,
    amount
  })
  t.truthy(createdBatch.batchId)
})
