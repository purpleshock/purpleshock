const test = require('ava')
const request = require('supertest')
const moment = require('moment')
const knex = require('../../../models/knex')
const batches = require('../../../models/batches')
const registration = require('../../../services/registration')
const app = require('../../../app')

let admin
const now = moment()
const minusTwoDay = moment(now).subtract(2, 'day').millisecond(0)
const minusOneDay = moment(now).subtract(1, 'day').millisecond(0)
const plusOneDay = moment(now).add(1, 'day').millisecond(0)
const plusTwoDay = moment(now).add(2, 'day').millisecond(0)

test.before(async t => {
  await knex.migrate.latest()

  admin = await registration.registerAdmin('admin@purpleshock.org', 'pas2vv0rd')

  await Promise.all([
    batches.create(admin.adminId, '-2_day_to_-1_day', {
      validAt: minusTwoDay.toDate(),
      expiredAt: minusOneDay.toDate()
    }),
    batches.create(admin.adminId, '-1_day_to_+0_day', {
      validAt: minusOneDay.toDate(),
      expiredAt: now.toDate()
    }),
    batches.create(admin.adminId, '+0_day_to_+1_day', {
      validAt: now.toDate(),
      expiredAt: plusOneDay.toDate()
    }),
    batches.create(admin.adminId, '+1_day_to_+2_day', {
      validAt: plusOneDay.toDate(),
      expiredAt: plusTwoDay.toDate()
    })
  ])
})

test('GET /api/v1/batches count between validate/expired', async t => {
  // -1 day to +1 day
  const validAt = minusOneDay.unix()
  const expiredAt = plusOneDay.unix()
  const foundBatchesResponse = await request(app)
    .get(`/api/v1/batches?validAt=${validAt}&expiredAt=${expiredAt}&page=1&size=10`)
    .set('Authorization', `JWT ${admin.token}`)

  t.is(foundBatchesResponse.body.length, 2)
  t.is(foundBatchesResponse.body[0].code, '+0_day_to_+1_day')
  t.is(foundBatchesResponse.body[1].code, '-1_day_to_+0_day')
  t.is(foundBatchesResponse.status, 200)
})
