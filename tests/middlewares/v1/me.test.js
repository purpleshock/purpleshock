const test = require('ava')
const request = require('supertest')
const knex = require('../../../models/knex')
const app = require('../../../app')

let createAdminResponse
let createPlayerResponse

test.before(async t => {
  await knex.migrate.latest()

  createAdminResponse = await request(app)
    .post('/api/v1/admins')
    .send({
      mail: 'admin@purpleshock.org',
      password: 'pas2vv0rd'
    })

  createPlayerResponse = await request(app)
    .post('/api/v1/players/uuid')
    .send({
      displayName: 'Somebody'
    })
})

test.serial('GET /api/v1/me with login admin', t => {
  return request(app)
    .get('/api/v1/me')
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)
    .then(response => {
      t.is(response.status, 200)
      t.truthy(response.body.adminId)
    })
})

test.serial('GET /api/v1/me with login player', t => {
  return request(app)
    .get('/api/v1/me')
    .set('Authorization', `JWT ${createPlayerResponse.body.token}`)
    .then(response => {
      t.is(response.status, 200)
      t.truthy(response.body.playerId)
    })
})
