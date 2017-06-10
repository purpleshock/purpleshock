const test = require('ava')
const request = require('supertest')
const { sequelize } = require('../../../models')
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
