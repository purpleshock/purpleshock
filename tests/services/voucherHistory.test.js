const test = require('ava')
const { sequelize } = require('../../models')
const { registration, batch, voucherHistory } = require('../../services')

const numVouchers = 10

test.before(async t => {
  await sequelize.sync({ force: true })
  const mail = 'admin@purpleshock.org'
  const password = 'pass2vv0rd'
  const amount = 100
  const admin = await registration.registerAdmin(mail, password)
  await batch.createBatch(admin.adminId, {
    numVouchers,
    amount
  })
})

test('#findByCreationTime', async t => {
  // start from 5 min. before
  const start = new Date(Date.now() - 300000)
  const end = new Date()
  const vouchers = await voucherHistory.findByCreationTime(start, end)
  t.is(vouchers.length, numVouchers)
})
