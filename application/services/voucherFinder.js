const vouchers = require('../models/vouchers')

const CODE_NOT_EXIST = 'CODE_NOT_EXIST'

function findByCodeTerm (term, size) {
  return vouchers.findByCodeTerm(term, size)
}

async function findByCode (code) {
  const voucher = await vouchers.findByCode(code)
  if (!voucher) {
    throw new Error(CODE_NOT_EXIST)
  }
  return voucher
}

async function findByBatch (batchCode, page, size) {
  const offset = (page - 1) * size
  return vouchers.findByBatch(batchCode, offset, size)
}

function countByBatch (batchCode) {
  return vouchers.countByBatch(batchCode)
}

module.exports = {
  CODE_NOT_EXIST,
  findByCodeTerm,
  findByCode,
  findByBatch,
  countByBatch
}
