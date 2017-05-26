const test = require('ava')
const request = require('supertest')
const { sequelize } = require('../../models')
const app = require('../../app')

const playerData = {
  displayName: 'Somebody'
}
let createSessionResponse

test.before(async t => {
  await sequelize.sync({ force: true })
  createSessionResponse = await request(app)
    .post('/api/v1/session/uuid')
    .send(playerData)
})

test.serial('GET /api/v1/me', t => {
  return request(app)
    .get('/api/v1/me')
    .set('Authorization', `JWT ${createSessionResponse.body.token}`)
    .then(response => {
      t.is(response.status, 200)
      t.is(response.body.displayName, playerData.displayName)
    })
})
