const test = require('ava')
const request = require('supertest')
const { sequelize } = require('../../../models')
const app = require('../../../app')

test.before(t => sequelize.sync({ force: true }))

test('POST /api/v1/players/uuid for new uuid player, and POST /api/v1/players/uuid/session for login', async t => {
  const createResponse = await request(app)
    .post('/api/v1/players/uuid')
    .send({
      displayName: 'Somebody'
    })

  t.is(createResponse.status, 200)
  t.is(typeof createResponse.body.uuid, 'string')
  t.is(typeof createResponse.body.token, 'string')

  const loginResponse = await request(app)
    .post('/api/v1/players/uuid/session')
    .send({
      uuid: createResponse.body.uuid
    })

  t.is(loginResponse.status, 200)
  t.is(typeof loginResponse.body.token, 'string')

  const failLoginResponse = await request(app)
    .post('/api/v1/players/uuid/session')
    .send({
      uuid: 'some-uuid-not-existed'
    })

  t.is(failLoginResponse.status, 404)
})
