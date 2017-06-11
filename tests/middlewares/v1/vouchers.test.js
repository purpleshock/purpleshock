const test = require('ava')
const request = require('supertest')
const { sequelize, Voucher } = require('../../../models')
const app = require('../../../app')

let createAdminResponse

test.before(async t => {
  await sequelize.sync({ force: true })

  createAdminResponse = await request(app)
    .post('/api/v1/admins')
    .send({
      mail: 'admin@purpleshock.org',
      password: 'pas2vv0rd'
    })
})

test('/GET get vouchers by terms', async t => {
  await Promise.all([
    Voucher.create({ code: 'xxxx-xxxx-xxxx-xxxx-xxxx' }),
    Voucher.create({ code: 'xxxy-xxxx-xxxx-xxxx-xxxx' }),
    Voucher.create({ code: 'xxyy-xxxx-xxxx-xxxx-xxxx' }),
    Voucher.create({ code: 'xyyy-xxxx-xxxx-xxxx-xxxx' }),
    Voucher.create({ code: 'yyyy-xxxx-xxxx-xxxx-xxxx' })
  ])

  const foundVouchersResponse = await request(app)
    .get('/api/v1/vouchers/codes?term=xxx&size=5')
    .set('Authorization', `JWT ${createAdminResponse.body.token}`)

  t.is(foundVouchersResponse.status, 200)
  t.is(foundVouchersResponse.body.length, 2)
  t.is(foundVouchersResponse.body[0], 'xxxx-xxxx-xxxx-xxxx-xxxx')
  t.is(foundVouchersResponse.body[1], 'xxxy-xxxx-xxxx-xxxx-xxxx')
})
