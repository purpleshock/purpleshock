const test = require('ava')
const request = require('supertest')
const knex = require('../../../models/knex')
const batches = require('../../../models/batches')
const registration = require('../../../services/registration')
const app = require('../../../app')

let createBatchResponse
let admin

test.before('POST /api/v1/batches for create batches of batches', async t => {
  await knex.migrate.latest()

  admin = await registration.registerAdmin('admin@purpleshock', 'pas2vv0rd')
  createBatchResponse = await request(app)
    .post('/api/v1/batches')
    .set('Authorization', `JWT ${admin.token}`)
    .send({
      num: 10,
      amount: 100
    })
})

test('batches response of batches', t => {
  t.truthy(createBatchResponse.body.code)
  t.is(createBatchResponse.status, 200)
})

test('GET /api/v1/batches/{code} to get batch detail', async t => {
  const foundBatchResponse = await request(app)
    .get(`/api/v1/batches/${createBatchResponse.body.code}`)
    .set('Authorization', `JWT ${admin.token}`)

  t.is(foundBatchResponse.body.code, createBatchResponse.body.code)
  t.is(foundBatchResponse.status, 200)
})

test('GET /api/v1/batches/codes to get batch codes by terms', async t => {
  await Promise.all([
    batches.create(admin.adminId, 'xxxx-xxxx-xxxx-xxxx-xxxx'),
    batches.create(admin.adminId, 'xxxy-xxxx-xxxx-xxxx-xxxx'),
    batches.create(admin.adminId, 'xxyy-xxxx-xxxx-xxxx-xxxx'),
    batches.create(admin.adminId, 'xyyy-xxxx-xxxx-xxxx-xxxx'),
    batches.create(admin.adminId, 'yyyy-xxxx-xxxx-xxxx-xxxx')
  ])

  const foundCodesResponse = await request(app)
    .get('/api/v1/batches/codes?term=xxx&size=5')
    .set('Authorization', `JWT ${admin.token}`)

  t.is(foundCodesResponse.status, 200)
  t.is(foundCodesResponse.body.length, 2)
  t.is(foundCodesResponse.body[0], 'xxxx-xxxx-xxxx-xxxx-xxxx')
  t.is(foundCodesResponse.body[1], 'xxxy-xxxx-xxxx-xxxx-xxxx')
})

test('GET /api/v1/batches/{batchCode}/vouchers to get vouchers belongs to the batch', async t => {
  const [batchResponse1, batchResponse2] = await Promise.all([
    request(app)
      .post('/api/v1/batches')
      .set('Authorization', `JWT ${admin.token}`)
      .send({ num: 10, amount: 100 }),
    request(app)
      .post('/api/v1/batches')
      .set('Authorization', `JWT ${admin.token}`)
      .send({ num: 5, amount: 100 })
  ])

  const [vouchersResponse1, vouchersResponse2] = await Promise.all([
    request(app)
      .get(`/api/v1/batches/${batchResponse1.body.code}/vouchers?page=1&size=10`)
      .set('Authorization', `JWT ${admin.token}`),
    request(app)
      .get(`/api/v1/batches/${batchResponse2.body.code}/vouchers?page=1&size=10`)
      .set('Authorization', `JWT ${admin.token}`)
  ])

  t.is(vouchersResponse1.body.length, 10)
  t.is(vouchersResponse1.status, 200)

  t.is(vouchersResponse2.body.length, 5)
  t.is(vouchersResponse2.status, 200)
})

test('GET /api/v1/batches/{batchCode}/vouchers/count to get voucher counts under batch', async t => {
  const countResponse = await request(app)
    .get(`/api/v1/batches/${createBatchResponse.body.code}/vouchers/count`)
    .set('Authorization', `JWT ${admin.token}`)

  t.is(countResponse.body, 10)
  t.is(countResponse.status, 200)
})
