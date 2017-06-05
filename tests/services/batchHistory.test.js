const test = require('ava')
const moment = require('moment')
const { sequelize } = require('../../models')
const { registration, batch, batchHistory } = require('../../services')

let admin

// clear history every time
test.beforeEach(async t => {
  await sequelize.sync({ force: true })
  const mail = 'admin@purpleshock.org'
  const password = 'pass2vv0rd'
  admin = await registration.registerAdmin(mail, password)
})

test.serial('#findByCreationTime', async t => {
  // create 3 batches
  await Promise.all([
    batch.createBatch(admin.adminId, { numVouchers: 5, amount: 100 }),
    batch.createBatch(admin.adminId, { numVouchers: 5, amount: 100 }),
    batch.createBatch(admin.adminId, { numVouchers: 5, amount: 100 })
  ])

  // start from 5 min. before  
  const from = moment().subtract(5, 'minutes')
  const to = moment()

  // page 1
  const page1 = await batchHistory.findByCreationTime(from, to, {
    page: 1,
    size: 2
  })
  t.is(page1.length, 2)

  // page 2
  const page2 = await batchHistory.findByCreationTime(from, to, {
    page: 2,
    size: 2
  })
  t.is(page2.length, 1)
})

test.serial('#findBetweenValidTime', async t => {
  // -10 min ~ -5 min
  const expiredBatch = {
    numVouchers: 5,
    amount: 100,
    validAt: moment().subtract(10, 'minutes'),
    expiredAt: moment().subtract(5, 'minutes')
  }
  // +5 min ~ +10 min
  const validBatch = {
    numVouchers: 5,
    amount: 100,
    validAt: moment().add(5, 'minutes'),
    expiredAt: moment().add(10, 'minutes')
  }
  // without expired time
  const withoutExpiredBatch = {
    numVouchers: 5,
    amount: 100
  }
  
  // create 2 batches
  const batches = await Promise.all([
    batch.createBatch(admin.adminId, expiredBatch),
    batch.createBatch(admin.adminId, validBatch),
    batch.createBatch(admin.adminId, withoutExpiredBatch)
  ])

  // start from now ~ +15 min
  const validAt = moment()
  const expiredAt = moment().add(15, 'minutes')

  const page = await batchHistory.findBetweenValidTime(validAt, expiredAt, {
    page: 1,
    size: 10
  })
  t.is(page.length, 1)
})
