const { Voucher } = require('../models/dao')
const VoucherStatus = require('../models/VoucherStatus')
const codeGenerate = require('./codeGenerate')

const ILLEGAL_OPERATION = 'illegalOperation'
const ILLEGAL_STATUS_OPERATION = 'illegalStatusOperation'

async function createVouchers (batchId, createdCount, amount) {
  const vouchers = []
  for (let i = 0; i < createdCount; i++) {
    vouchers[i] = {
      batchId,
      amount,
      code: codeGenerate.getCode(),
      status: VoucherStatus.INITIALIZED
    }
  }
  await Voucher.bulkCreate(vouchers)
}

async function updateVoucher (from, to) {
  if (to.hasOwnProperty('status') && !VoucherStatus.canMakeTransition(from.status, to.status)) {
    throw new Error(ILLEGAL_STATUS_OPERATION)
  }

  const modifyBody = Object.entries(to)
    .filter(([field, value]) => {
      const isValidField = ['amount', 'status'].indexOf(field) > -1
      const isValidValue = value !== null && value !== undefined
      return isValidField && isValidValue
    })
    .reduce((reducedBody, [field, val]) => {
      reducedBody[field] = val
      return reducedBody
    }, {})

  if (Object.keys(modifyBody).length === 0) {
    // not thing need to modify
    return
  }

  await Voucher.updateByCode(from.code, modifyBody)
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
