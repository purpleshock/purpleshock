const { Wallet, Voucher } = require('../models/dao')
const { VoucherStatus } = require('../models')
const depositHistory = require('./depositHistory')

const INVALID_WALLET = 'invalid_wallet'
const INVALID_VOUCHER = 'invalid_voucher'
const ILLEGAL_STATUS_OPERATION = 'illegal_status_operation'

async function attachNewWallet (playerId, balance = 0) {
  const wallet = await Wallet.create({
    playerId,
    balance
  })
  return wallet.toJSON()
}

async function deposit (playerId, code) {
  const [wallet, voucher] = await Promise.all([
    Wallet.findByOwner(playerId),
    Voucher.findByCode(code)
  ])

  if (!wallet) {
    throw new Error(INVALID_WALLET)
  } else if (!voucher) {
    throw new Error(INVALID_VOUCHER)
  } else {
    // check if voucher can be applied
    const voucherStatus = new VoucherStatus(voucher.status)
    if (voucherStatus.cannot('apply')) {
      throw new Error(ILLEGAL_STATUS_OPERATION)
    }
  }

  wallet.balance += voucher.amount
  voucher.status = VoucherStatus.APPLIED
  await Promise.all([
    wallet.save(),
    voucher.save()
  ])

  await depositHistory.insertNewRecord(playerId, voucher.voucherId)

  return wallet.toJSON()
}

module.exports = {
  INVALID_WALLET,
  INVALID_VOUCHER,
  ILLEGAL_STATUS_OPERATION,
  attachNewWallet,
  deposit
}
