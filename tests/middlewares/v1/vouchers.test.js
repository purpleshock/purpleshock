const test = require('ava')
const request = require('supertest')
const { sequelize } = require('../../../models')
const app = require('../../../app')

let createAdminResponse
let createVouchersResponse

test.before('POST /api/v1/vouchers for create batches of vouchers', async t => {
  await sequelize.sync({ force: true })

  createAdminResponse = await request(app)
    .post('/api/v1/admins')
    .send({
      mail: 'admin@purpleshock.org',
      password: 'pas2vv0rd'
    })

  createVouchersResponse = await request(app)
    .post('/api/v1/vouchers')
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)
    .send({
      num: 10
    })
})

test('batches response of vouchers', t => {
  t.is(createVouchersResponse.status, 200)
  // t.truthy(createVouchersResponse.body.batchId)
})
