const uuid = require('uuid')
const { Voucher } = require('../models')
const voucerStatus = require('../consts/voucherStatus')
const codeGenerate = require('./codeGenerate')

async function createVouchers (batchId, createdCount, amount) {
  const vouchers = []
  for (let i = 0; i < createdCount; i++) {
    vouchers[i] = {
      batchId,
      code: codeGenerate.getCode(),
      amount,
      status: voucerStatus.INITIALIZED
    }
  }
  await Voucher.bulkCreate(vouchers)
}

module.exports = {
  createVouchers
}
