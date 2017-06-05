const uuid = require('uuid')
const { Batch, Voucher } = require('../models')

async function createBatch (adminId, batchData) {
  const batchCount = batchData.batchCount || 100
  const { validAt, expiredAt, numVouchers, amount } = batchData
  const batch = await Batch.create({
    adminId,
    validAt: validAt && validAt.toDate(),
    expiredAt: expiredAt && validAt.toDate()
  })

  let createdCount = 0
  while (createdCount < numVouchers) {
    const num = Math.min(numVouchers - createdCount, batchCount)
    createdCount += num

    const vouchers = []
    for (let i = 0; i < num; i++) {
      vouchers[i] = {
        batchId: batch.batchId,
        code: uuid.v4(),
        amount
      }
    }
    await Voucher.bulkCreate(vouchers)
  }

  return batch.toJSON()
}

module.exports = {
  createBatch
}
