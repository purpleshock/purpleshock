const test = require('ava')
const { sequelize } = require('../../models')
const { registration, batch, batchHistory } = require('../../services')

let admin

test.before(async t => {
  await sequelize.sync({ force: true })
  const mail = 'admin@purpleshock.org'
  const password = 'pass2vv0rd'
  admin = await registration.registerAdmin(mail, password)
})

test('#findByCreationTime', async t => {
  // create 2 batches
  await batch.createBatch(admin.adminId, { numVouchers: 5, amount: 100 })
  await batch.createBatch(admin.adminId, { numVouchers: 5, amount: 100 })
  await batch.createBatch(admin.adminId, { numVouchers: 5, amount: 100 })

  // start from 5 min. before
  const duration = {
    from: new Date(Date.now() - 300000),
    to: new Date()
  }

  // page 1
  const page1 = await batchHistory.findByCreationTime(duration, {
    page: 1,
    size: 2
  })
  t.is(page1.length, 2)

  // page 2
  const page2 = await batchHistory.findByCreationTime(duration, {
    page: 2,
    size: 2
  })
  t.is(page2.length, 1)
})
