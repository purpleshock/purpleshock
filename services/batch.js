const { Batch } = require('../models')
const voucher = require('./voucher')

async function createBatch (adminId, batchData) {
  const batchCount = batchData.batchCount || 100
  const { validAt, expiredAt, num, amount } = batchData
  const batch = await Batch.create({
    adminId,
    validAt: validAt && validAt.toDate(),
    expiredAt: expiredAt && validAt.toDate()
  })

  let createdCount = 0
  while (createdCount < num) {
    const n = Math.min(num - createdCount, batchCount)
    await voucher.createVouchers(batch.batchId, n, amount)
    createdCount += n
  }

  return batch.toJSON()
}

module.exports = {
  createBatch
}
