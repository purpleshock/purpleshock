const test = require('ava')
const request = require('supertest')
const session = require('./session')
const app = require('../../mockApp')({ session })

let uuid

test.serial.skip('POST /session/uuid', t => {
  return request(app)
    .post('/session/uuid')
    .send({
      "displayName": "Somebody"
    })
    .then(response => {
      const { uuid, token } = response.body
      t.is(typeof uuid, 'string')
      t.is(typeof token, 'string')
      uuid = response.uuid
    })
})

test.serial.skip('POST /session with uuid', t => {
  return request(app)
    .post('/session')
    .send({
      uuid
    })
    .then(response => {
      const { uuid, token } = response.body
      t.is(typeof token, 'string')
    })
})
