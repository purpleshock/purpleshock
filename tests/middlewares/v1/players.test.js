const test = require('ava')
const request = require('supertest')
const knex = require('../../../models/knex')
const app = require('../../../app')

test.before(t => knex.migrate.latest())

test('POST /api/v1/players/uuid for new uuid player, and POST /api/v1/players/uuid/session for login', async t => {
  const createResponse = await request(app)
    .post('/api/v1/players/uuid')
    .send({
      displayName: 'Somebody'
    })

  t.is(typeof createResponse.body.uuid, 'string')
  t.is(typeof createResponse.body.token, 'string')
  t.is(createResponse.status, 200)

  const loginResponse = await request(app)
    .post('/api/v1/players/uuid/session')
    .send({
      uuid: createResponse.body.uuid
    })

  t.is(typeof loginResponse.body.token, 'string')
  t.is(loginResponse.status, 200)

  const failLoginResponse = await request(app)
    .post('/api/v1/players/uuid/session')
    .send({
      uuid: 'some-uuid-not-existed'
    })

  t.is(failLoginResponse.status, 404)
})
