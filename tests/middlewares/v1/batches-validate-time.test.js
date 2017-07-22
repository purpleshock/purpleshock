const test = require('ava')
const request = require('supertest')
const moment = require('moment')
const { sequelize, Batch } = require('../../../models/dao')
const app = require('../../../app')

let createAdminResponse
const now = moment()
const minusTwoDay = moment(now).subtract(2, 'day')
const minusOneDay = moment(now).subtract(1, 'day')
const plusOneDay = moment(now).add(1, 'day')
const plusTwoDay = moment(now).add(2, 'day')

test.before(async t => {
  await sequelize.sync({ force: true })

  createAdminResponse = await request(app)
    .post('/api/v1/admins')
    .send({
      mail: 'admin@purpleshock.org',
      password: 'pas2vv0rd'
    })

  await Promise.all([
    Batch.create({
      code: '-2_day_to_-1_day',
      validAt: minusTwoDay.formatSQL(),
      expiredAt: minusOneDay.formatSQL()
    }),
    Batch.create({
      code: '-1_day_to_+0_day',
      validAt: minusOneDay.formatSQL(),
      expiredAt: now.formatSQL()
    }),
    Batch.create({
      code: '+0_day_to_+1_day',
      validAt: now.formatSQL(),
      expiredAt: plusOneDay.formatSQL()
    }),
    Batch.create({
      code: '+1_day_to_+2_day',
      validAt: plusOneDay.formatSQL(),
      expiredAt: plusTwoDay.formatSQL()
    })
  ])
})

test('GET /api/v1/batches/count count between validate/expired', async t => {
  // -1 day to +1 day
  const validAt = minusOneDay.unix()
  const expiredAt = plusOneDay.unix()
  const foundBatchesResponse = await request(app)
    .get(`/api/v1/batches/count?validAt=${validAt}&expiredAt=${expiredAt}`)
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)

  t.is(foundBatchesResponse.status, 200)
  t.is(foundBatchesResponse.body, 2)
})

test('GET /api/v1/batches/count count by validate', async t => {
  // before +0 day
  const validAt = now.unix()
  const foundBatchesResponse = await request(app)
    .get(`/api/v1/batches/count?validAt=${validAt}`)
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)

  t.is(foundBatchesResponse.status, 200)
  t.is(foundBatchesResponse.body, 2)
})

test('GET /api/v1/batches/count count by expired', async t => {
  // before +1 day
  const expiredAt = plusOneDay.unix()
  const foundBatchesResponse = await request(app)
    .get(`/api/v1/batches/count?expiredAt=${expiredAt}`)
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)

  t.is(foundBatchesResponse.status, 200)
  t.is(foundBatchesResponse.body, 3)
})
