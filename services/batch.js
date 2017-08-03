const { Batch } = require('../models/dao')
const voucher = require('./voucher')
const codeGenerate = require('./codeGenerate')

async function createBatch (adminId, batchData) {
  const batchCount = batchData.batchCount || 100
  const { validAt, expiredAt, num, amount, description } = batchData
  const batch = await Batch.create({
    adminId,
    code: codeGenerate.getCode(),
    createdAt: new Date(),
    validAt: validAt && validAt.toDate(),
    expiredAt: expiredAt && expiredAt.toDate(),
    description
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
