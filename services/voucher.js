const uuid = require('uuid')
const { Voucher } = require('../models')
const voucerStatus = require('../consts/voucherStatus')

async function createBatch (batchId, createdCount, amount) {
  const vouchers = []
  for (let i = 0; i < createdCount; i++) {
    vouchers[i] = {
      batchId,
      code: uuid.v4(),
      amount,
      status: voucerStatus.INITIALIZED
    }
  }
  await Voucher.bulkCreate(vouchers)
}

module.exports = {
  createBatch
}
