const test = require('ava')
const request = require('supertest')
const { sequelize, Voucher, Batch } = require('../../../models')
const app = require('../../../app')

let createAdminResponse

test.before(async t => {
  await sequelize.sync({ force: true })

  await Promise.all([
    Voucher.create({ code: 'xxxx-xxxx-xxxx-xxxx-xxxx', status: 'INITIAILIZED', amount: 100 }),
    Voucher.create({ code: 'xxxy-xxxx-xxxx-xxxx-xxxx', status: 'INITIAILIZED', amount: 100 }),
    Voucher.create({ code: 'xxyy-xxxx-xxxx-xxxx-xxxx', status: 'INITIAILIZED', amount: 100 }),
    Voucher.create({ code: 'xyyy-xxxx-xxxx-xxxx-xxxx', status: 'INITIAILIZED', amount: 100 }),
    Voucher.create({ code: 'yyyy-xxxx-xxxx-xxxx-xxxx', status: 'INITIAILIZED', amount: 100 })
  ])

  createAdminResponse = await request(app)
    .post('/api/v1/admins')
    .send({
      mail: 'admin@purpleshock.org',
      password: 'pas2vv0rd'
    })
})

test('GET /api/v1/vouchers to get vouchers by terms', async t => {
  const foundVouchersResponse = await request(app)
    .get('/api/v1/vouchers?term=xxx&size=5')
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)

  t.is(foundVouchersResponse.status, 200)
  t.is(foundVouchersResponse.body.length, 2)
  t.is(foundVouchersResponse.body[0].code, 'xxxx-xxxx-xxxx-xxxx-xxxx')
  t.is(foundVouchersResponse.body[1].code, 'xxxy-xxxx-xxxx-xxxx-xxxx')
})

test('GET /api/v1/vouchers/codes to get voucher codes by terms', async t => {
  const foundVouchersResponse = await request(app)
    .get('/api/v1/vouchers/codes?term=xxx&size=5')
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)

  t.is(foundVouchersResponse.status, 200)
  t.is(foundVouchersResponse.body.length, 2)
  t.is(foundVouchersResponse.body[0], 'xxxx-xxxx-xxxx-xxxx-xxxx')
  t.is(foundVouchersResponse.body[1], 'xxxy-xxxx-xxxx-xxxx-xxxx')
})

test('GET /api/v1/vouchers/{code} to get voucher detail', async t => {
  const batchCode = 'a-mock-batch-code'
  const voucherCode = 'a-mock-voucher-code'
  const batch = await Batch.create({
    code: batchCode
  })
  await Voucher.create({
    batchId: batch.batchId,
    status: 0,
    amount: 100,
    code: voucherCode
  })

  const foundVoucherResponse = await request(app)
    .get(`/api/v1/vouchers/${voucherCode}`)
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)

  t.is(foundVoucherResponse.status, 200)
  t.is(foundVoucherResponse.body.code, voucherCode)
  t.is(foundVoucherResponse.body.batchCode, batchCode)
  t.is(foundVoucherResponse.body.status, 'INITIALIZED')
})
