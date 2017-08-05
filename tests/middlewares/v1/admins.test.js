const test = require('ava')
const request = require('supertest')
const knex = require('../../../models/knex')
const app = require('../../../app')

const mail = 'admin@purpleshock.org'
const password = 'pas2vv0rd'

let createResponse

test.before('POST /api/v1/admins for new admin account', async t => {
  await knex.migrate.latest()

  createResponse = await request(app)
    .post('/api/v1/admins')
    .send({
      mail,
      password
    })

  t.is(typeof createResponse.body.token, 'string')
  t.is(createResponse.status, 200)
})

test('POST /api/v1/admins/session for login', async t => {
  const loginResponse = await request(app)
    .post('/api/v1/admins/session')
    .send({
      mail,
      password
    })

  t.is(typeof loginResponse.body.token, 'string')
  t.is(loginResponse.status, 200)
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
