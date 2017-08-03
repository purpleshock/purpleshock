const test = require('ava')
const request = require('supertest')
const moment = require('moment')
const { sequelize } = require('../../../models/dao')
const app = require('../../../app')
const { Voucher } = require('../../../models/dao')
const { VoucherStatus } = require('../../../models')

let createPlayerResponse

test.before(async t => {
  await sequelize.sync({ force: true })

  createPlayerResponse = await request(app)
    .post('/api/v1/players/uuid')
    .send({
      displayName: 'Somebody'
    })

  await Promise.all([
    Voucher.create({
      code: 'voucher-that-is-not-ready-for-deposit',
      status: VoucherStatus.INITIALIZED,
      amount: 100
    }),
    Voucher.create({
      code: 'voucher-that-is-ready-for-deposit',
      status: VoucherStatus.SOLD,
      amount: 100
    })
  ])
})

test.serial('POST /api/v1/deposit for making deposit voucher into wallet', async t => {
  const depositResponse = await request(app)
    .post('/api/v1/deposit')
    .set('Authorization', `JWT ${createPlayerResponse.body.token}`)
    .send({
      code: 'voucher-that-is-ready-for-deposit'
    })

  t.deepEqual(depositResponse.body, {
    balance: 100
  })
  t.is(depositResponse.status, 200)
})

test.serial('POST /api/v1/deposit for making deposit voucher with the same voucher', async t => {
  const depositResponse = await request(app)
    .post('/api/v1/deposit')
    .set('Authorization', `JWT ${createPlayerResponse.body.token}`)
    .send({
      code: 'voucher-that-is-ready-for-deposit'
    })

  t.is(depositResponse.status, 400)
})

test.serial('GET /api/v1/deposit for retrieving deposit history', async t => {
  // 5 minutes before - 5 minutes after
  const from = moment().subtract(5, 'minutes').unix()
  const to = moment().add(5, 'minutes').unix()

  const depositHistoryResponse = await request(app)
    .get(`/api/v1/deposit?from=${from}&to=${to}&page=1&pagination=10`)
    .set('Authorization', `JWT ${createPlayerResponse.body.token}`)

  t.is(depositHistoryResponse.body.length, 1)
  t.is(depositHistoryResponse.body[0].code, 'voucher-that-is-ready-for-deposit')
  t.is(depositHistoryResponse.body[0].amount, 100)
  t.is(depositHistoryResponse.status, 200)
})

test.serial('GET /api/v1/deposit for retrieving not existed deposit history', async t => {
  // 5 minutes after - 10 minutes after
  const from = moment().add(5, 'minutes').unix()
  const to = moment().add(10, 'minutes').unix()

  const depositHistoryResponse = await request(app)
    .get(`/api/v1/deposit?from=${from}&to=${to}&page=1&pagination=10`)
    .set('Authorization', `JWT ${createPlayerResponse.body.token}`)

  t.is(depositHistoryResponse.status, 404)
})

test('POST /api/v1/deposit for making deposit with invalid voucher', async t => {
  const depositResponse = await request(app)
    .post('/api/v1/deposit')
    .set('Authorization', `JWT ${createPlayerResponse.body.token}`)
    .send({
      code: 'voucher-that-is-not-ready-for-deposit'
    })

  t.is(depositResponse.status, 400)
})

test('POST /api/v1/deposit for making deposit with not existed voucher', async t => {
  const depositResponse = await request(app)
    .post('/api/v1/deposit')
    .set('Authorization', `JWT ${createPlayerResponse.body.token}`)
    .send({
      code: 'voucher-that-is-not-even-exist'
    })

  t.is(depositResponse.status, 400)
})
