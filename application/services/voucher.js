const VoucherStatus = require('../models/VoucherStatus')
const vouchers = require('../models/vouchers')
const codeGenerate = require('./codeGenerate')
const { getPropertiesFilterFn } = require('../utils/purify')

const ILLEGAL_OPERATION = 'illegalOperation'
const ILLEGAL_STATUS_OPERATION = 'illegalStatusOperation'

function generateVoucherDatas (batchId, amount, num) {
  const voucherDatas = []
  for (let i = 0; i < num; i++) {
    voucherDatas[i] = {
      batchId,
      amount,
      code: codeGenerate.getCode(),
      status: VoucherStatus.INITIALIZED
    }
  }
  return voucherDatas
}

async function createVouchers (batchId, numVouchers, amount) {
  let created = []
  const maxBatch = 100
  while (created.length < numVouchers) {
    const numCreate = Math.min(maxBatch, numVouchers - created.length)
    const voucherDatas = generateVoucherDatas(batchId, amount, numCreate)
    await vouchers.createMulti(voucherDatas)
    created = created.concat(voucherDatas)
  }
  return created
}

const checkValidFields = getPropertiesFilterFn('amount', 'status')

async function updateVoucher (from, to) {
  // if change status, that's an illegal operation
  if (to.hasOwnProperty('status')) {
    const isValidOperation = VoucherStatus.canMakeTransition(from.status, to.status)
    if (!isValidOperation) {
      throw new Error(ILLEGAL_STATUS_OPERATION)
    }
  }

  const modifyBody = checkValidFields(to)
  if (Object.keys(modifyBody).length > 0) {
    await vouchers.update(from.code, modifyBody)
  }
}

function getAvailableStatus (status) {
  const allStatus = VoucherStatus.getAvailableStatus()
  return allStatus.filter(testStatus => VoucherStatus.canMakeTransition(status, testStatus))
}

module.exports = {
  ILLEGAL_OPERATION,
  ILLEGAL_STATUS_OPERATION,
  createVouchers,
  updateVoucher,
  getAvailableStatus
}
