const test = require('ava')
const request = require('supertest')
const { sequelize } = require('../../../models')
const app = require('../../../app')

test.before(t => sequelize.sync({ force: true }))

test('POST /api/v1/admins for new admin account, and POST /api/v1/admins/session for login', async t => {
  const mail = 'admin@purpleshock.org'
  const password = 'pas2vv0rd'

  const createResponse = await request(app)
    .post('/api/v1/admins')
    .send({
      mail,
      password
    })

  t.is(createResponse.status, 200)
  t.is(typeof createResponse.body.token, 'string')

  const loginResponse = await request(app)
    .post('/api/v1/admins/session')
    .send({
      mail,
      password
    })

  t.is(loginResponse.status, 200)
  t.is(typeof loginResponse.body.token, 'string')
})
