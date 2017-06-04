const { Batch, Voucher } = require('../models')

async function findByCreationTime (from, to) {
  const batches = await Batch.findBetweenCreationTime(from, to)
  let vouchers = []
  for (let batch of batches) {
    const batchVouchers = await batch.getVouchers()
    vouchers = vouchers.concat(batchVouchers.map(batchVoucher => batchVoucher.toJSON()))
  }
  return vouchers
}

module.exports = {
  findByCreationTime
}
