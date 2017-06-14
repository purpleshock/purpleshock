const test = require('ava')
const request = require('supertest')
const { sequelize, Batch } = require('../../../models')
const app = require('../../../app')

let createAdminResponse
let createBatchResponse

test.before('POST /api/v1/batches for create batches of batches', async t => {
  await sequelize.sync({ force: true })

  createAdminResponse = await request(app)
    .post('/api/v1/admins')
    .send({
      mail: 'admin@purpleshock.org',
      password: 'pas2vv0rd'
    })

  createBatchResponse = await request(app)
    .post('/api/v1/batches')
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)
    .send({
      num: 10,
      amount: 100
    })
})

test('batches response of batches', t => {
  t.is(createBatchResponse.status, 200)
  t.truthy(createBatchResponse.body.code)
})

test('GET /api/v1/batches/{code} to get batch detail', async t => {
  const foundBatchResponse = await request(app)
    .get(`/api/v1/batches/${createBatchResponse.body.code}`)
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)

  t.is(foundBatchResponse.status, 200)
  t.is(foundBatchResponse.body.code, createBatchResponse.body.code)
})

test('GET /api/v1/batches/codes to get batch codes by terms', async t => {
  await Promise.all([
    Batch.create({ code: 'xxxx-xxxx-xxxx-xxxx-xxxx' }),
    Batch.create({ code: 'xxxy-xxxx-xxxx-xxxx-xxxx' }),
    Batch.create({ code: 'xxyy-xxxx-xxxx-xxxx-xxxx' }),
    Batch.create({ code: 'xyyy-xxxx-xxxx-xxxx-xxxx' }),
    Batch.create({ code: 'yyyy-xxxx-xxxx-xxxx-xxxx' })
  ])

  const foundCodesResponse = await request(app)
    .get('/api/v1/batches/codes?term=xxx&size=5')
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)

  t.is(foundCodesResponse.status, 200)
  t.is(foundCodesResponse.body.length, 2)
  t.is(foundCodesResponse.body[0], 'xxxx-xxxx-xxxx-xxxx-xxxx')
  t.is(foundCodesResponse.body[1], 'xxxy-xxxx-xxxx-xxxx-xxxx')
})
