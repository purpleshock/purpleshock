const test = require('ava')
const request = require('supertest')
const knex = require('../../../models/knex')
const batches = require('../../../models/batches')
const vouchers = require('../../../models/vouchers')
const VoucherStatus = require('../../../models/VoucherStatus')
const registration = require('../../../services/registration')
const app = require('../../../app')

let admin

test.before(async t => {
  await knex.migrate.latest()
  admin = await registration.registerAdmin('admin@purpleshock.org', 'pas2vv0rd')
  const batch = await batches.create(admin.adminId, 'uuid-code-for-batch')
  await Promise.all([
    vouchers.create(batch.batchId, 'xxxx-xxxx-xxxx-xxxx-xxxx', 100, VoucherStatus.INITIALIZED),
    vouchers.create(batch.batchId, 'xxxy-xxxx-xxxx-xxxx-xxxx', 100, VoucherStatus.INITIALIZED),
    vouchers.create(batch.batchId, 'xxyy-xxxx-xxxx-xxxx-xxxx', 100, VoucherStatus.INITIALIZED),
    vouchers.create(batch.batchId, 'xyyy-xxxx-xxxx-xxxx-xxxx', 100, VoucherStatus.INITIALIZED),
    vouchers.create(batch.batchId, 'yyyy-xxxx-xxxx-xxxx-xxxx', 100, VoucherStatus.INITIALIZED)
  ])
})

test('GET /api/v1/vouchers to get vouchers by terms', async t => {
  const foundVouchersResponse = await request(app)
    .get('/api/v1/vouchers?term=xxx&size=5')
    .set('Authorization', `JWT ${admin.token}`)

  t.is(foundVouchersResponse.body.length, 2)
  t.is(foundVouchersResponse.body[0].code, 'xxxx-xxxx-xxxx-xxxx-xxxx')
  t.is(foundVouchersResponse.body[1].code, 'xxxy-xxxx-xxxx-xxxx-xxxx')
  t.is(foundVouchersResponse.status, 200)
})

test('GET /api/v1/vouchers/{code} to get voucher detail', async t => {
  const batchCode = 'a-mock-batch-code'
  const voucherCode = 'a-mock-voucher-code'
  const batch = await batches.create(admin.adminId, batchCode)
  await vouchers.create(batch.batchId, voucherCode, 100, VoucherStatus.INITIALIZED)

  const foundVoucherResponse = await request(app)
    .get(`/api/v1/vouchers/${voucherCode}`)
    .set('Authorization', `JWT ${admin.token}`)

  t.is(foundVoucherResponse.body.code, voucherCode)
  t.is(foundVoucherResponse.body.batch, batchCode)
  t.is(foundVoucherResponse.status, 200)
})

test('PUT /api/v1/vouchers/{code} to modify voucher fields', async t => {
  const voucherCode = 'voucher-to-be-modified'
  const newAmount = 1000
  const newStatus = VoucherStatus.ACTIVATED
  const batch = await batches.create(admin.adminId, 'batch-for-voucher-to-be-modified')
  await vouchers.create(batch.batchId, voucherCode, 100, VoucherStatus.INITIALIZED)

  const editVoucherResponse = await request(app)
    .put(`/api/v1/vouchers/${voucherCode}`)
    .set('Authorization', `JWT ${admin.token}`)
    .send({
      status: newStatus,
      amount: newAmount
    })
  const modifiedVoucher = await vouchers.findByCode(voucherCode)

  t.is(modifiedVoucher.amount, newAmount)
  t.is(modifiedVoucher.status, VoucherStatus.ACTIVATED)
  t.is(editVoucherResponse.status, 200)
})

test('PUT /api/v1/vouchers/{code} to modify voucher code is illegal', async t => {
  const voucherCode = 'voucher-to-be-modified-illegally'
  const batch = await batches.create(admin.adminId, 'batch-for-voucher-to-be-illegally-modified')
  await vouchers.create(batch.batchId, voucherCode, 100, VoucherStatus.INITIALIZED)

  await request(app)
    .put(`/api/v1/vouchers/${voucherCode}`)
    .set('Authorization', `JWT ${admin.token}`)
    .send({
      code: 'voucher-code-cannot-be-modified'
    })
  const modifiedVoucher = await vouchers.findByCode(voucherCode)

  t.is(modifiedVoucher.code, voucherCode)
})

test('PUT /api/v1/vouchers/{code} to perform illegal voucher status operation', async t => {
  const voucherCode = 'voucher-to-be-modified-on-illegal-status'
  const originStatus = VoucherStatus.ACTIVATED
  const batch = await batches.create(admin.adminId, 'batch-for-voucher-to-be-performed-illegal-status-operation')
  await vouchers.create(batch.batchId, voucherCode, 100, originStatus)

  const editVoucherResponse = await request(app)
    .put(`/api/v1/vouchers/${voucherCode}`)
    .set('Authorization', `JWT ${admin.token}`)
    .send({
      status: VoucherStatus.INITIALIZED
    })
  const modifiedVoucher = await vouchers.findByCode(voucherCode)

  t.is(modifiedVoucher.status, originStatus)
  t.is(editVoucherResponse.status, 405)
})

test('GET /api/v1/vouchers/{code}/available-status to get all vouchers available status', async t => {
  const voucherCode = 'voucher-to-be-test-with-getting-available-status'
  const batch = await batches.create(admin.adminId, 'batch-for-getting-all-voucher-available status')
  const voucher = await vouchers.create(batch.batchId, voucherCode, 100, VoucherStatus.INITIALIZED)

  const availableStatusResponse = await request(app)
    .get(`/api/v1/vouchers/${voucher.code}/available-status`)
    .set('Authorization', `JWT ${admin.token}`)

  t.deepEqual(availableStatusResponse.body, [
    VoucherStatus.ACTIVATED,
    VoucherStatus.DEACTIVATED
  ])
  t.is(availableStatusResponse.status, 200)
})

test('GET /api/v1/vouchers/status to get all vouchers available status', async t => {
  const statusResponse = await request(app)
    .get('/api/v1/vouchers/status')
    .set('Authorization', `JWT ${admin.token}`)

  t.deepEqual(statusResponse.body, [
    VoucherStatus.INITIALIZED,
    VoucherStatus.ACTIVATED,
    VoucherStatus.DEACTIVATED,
    VoucherStatus.CONSIGNED,
    VoucherStatus.SOLD,
    VoucherStatus.APPLIED
  ])
  t.is(statusResponse.status, 200)
})
