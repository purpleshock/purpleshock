const batches = require('../models/batches')
const voucher = require('./voucher')
const codeGenerate = require('./codeGenerate')

async function createBatch (adminId, batchData) {
  const batchCount = batchData.batchCount || 100
  const { validAt, expiredAt, num, amount, description, createdAt } = batchData
  const batch = await batches.create(adminId, codeGenerate.getCode(), {
    validAt: validAt && validAt.toDate(),
    expiredAt: expiredAt && expiredAt.toDate(),
    createdAt: createdAt && createdAt.toDate(),
    description
  })

  let createdCount = 0
  while (createdCount < num) {
    const n = Math.min(num - createdCount, batchCount)
    await voucher.createVouchers(batch.batchId, n, amount)
    createdCount += n
  }

  return batch
}

module.exports = {
  createBatch
}
