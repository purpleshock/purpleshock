const test = require('ava')
const request = require('supertest')
const { sequelize } = require('../../../models')
const app = require('../../../app')

const mail = 'admin@purpleshock.org'
const password = 'pas2vv0rd'

let createResponse

test.before('POST /api/v1/admins for new admin account', async t => {
  await sequelize.sync({
    force: true
  })

  createResponse = await request(app)
    .post('/api/v1/admins')
    .send({
      mail,
      password
    })

  t.is(createResponse.status, 200)
  t.is(typeof createResponse.body.token, 'string')
})

test('POST /api/v1/admins/session for login', async t => {
  const loginResponse = await request(app)
    .post('/api/v1/admins/session')
    .send({
      mail,
      password
    })

  t.is(loginResponse.status, 200)
  t.is(typeof loginResponse.body.token, 'string')
})

test('GET /api/v1/admins/token for token check', async t => {
  const checkTokenResponse = await request(app)
    .get('/api/v1/admins/token')
    .set('Authorization', `JWT ${createResponse.body.token}`)

  t.is(checkTokenResponse.status, 200)

  const checkInvalidTokenResponse = await request(app)
    .get('/api/v1/admins/token')
    .set('Authorization', `JWT some-invalid-tokens`)

  t.is(checkInvalidTokenResponse.status, 401)
})
