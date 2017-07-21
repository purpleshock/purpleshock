const { Voucher } = require('../models/dao')
const VoucherStatus = require('../models/VoucherStatus')
const codeGenerate = require('./codeGenerate')

async function createVouchers (batchId, createdCount, amount) {
  const vouchers = []
  for (let i = 0; i < createdCount; i++) {
    vouchers[i] = {
      batchId,
      code: codeGenerate.getCode(),
      amount,
      status: VoucherStatus.getStatusValue(VoucherStatus.INITIALIZED)
    }
  }
  await Voucher.bulkCreate(vouchers)
}

module.exports = {
  createVouchers
}
