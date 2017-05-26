const test = require('ava')
const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')

let createSessionResponse

test.before(async t => {
  await sequelize.sync({ force: true })
  createSessionResponse = await request(app)
    .post('/api/v1/session/uuid')
    .send({
      displayName: 'Somebody'
    })
})

test('login with uuid', t => {
  return request(app)
    .get('/api/v1/me')
    .set('Authorization', `JWT ${createSessionResponse.body.token}`)
    .then(response => {
      t.is(response.status, 200)
    })
})

test('login with uuid', async t => {
  return request(app)
    .get('/api/v1/me')
    .set('Authorization', `JWT some-invalid-token`)
    .then(response => {
      t.is(response.status, 401)
    })
})
