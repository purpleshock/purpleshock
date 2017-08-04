const { Batch, Voucher } = require('../models/dao')

async function findByCodeTerm (term, size) {
  const vouchers = await Voucher.findCodeLike(term, size)

  return vouchers.map(voucherModel => {
    const voucher = voucherModel.toJSON()
    const { code, amount, status } = voucher
    return {
      code,
      batch: voucher.Batch.code,
      amount,
      status
    }
  })
}

async function findByCode (code) {
  const voucher = await Voucher.find({
    where: {
      code
    }
  })
  return voucher && voucher.toJSON()
}

async function findByBatchCode (batchCode, page, size) {
  const batch = await Batch.find({
    where: { code: batchCode }
  })
  if (!batch) {
    return null
  }

  const vouchers = await Voucher.findAll({
    where: { batchId: batch.batchId },
    limit: size,
    offset: (page - 1) * size
  })

  return vouchers.map(voucher => voucher.toJSON())
}

function countByBatchId (batchId) {
  return Voucher.count({
    where: { batchId }
  })
}

module.exports = {
  findByCodeTerm,
  findByCode,
  findByBatchCode,
  countByBatchId
}
