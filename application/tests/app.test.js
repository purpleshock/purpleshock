const test = require('ava')
const request = require('supertest')
const app = require('../app')
const knex = require('../models/knex')

let createAdminResponse, createPlayerResponse

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

test('admin login with uuid', t => {
  return request(app)
    .get('/api/v1/me')
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)
    .then(response => {
      t.is(response.status, 200)
      t.truthy(response.body.adminId)
    })
})

test('player login with uuid', t => {
  return request(app)
    .get('/api/v1/me')
    .set('Authorization', `JWT ${createPlayerResponse.body.token}`)
    .then(response => {
      t.is(response.status, 200)
      t.truthy(response.body.playerId)
    })
})

test('login with wrong uuid', t => {
  return request(app)
    .get('/api/v1/me')
    .set('Authorization', `JWT some-invalid-token`)
    .then(response => {
      t.is(response.status, 401)
    })
})
