const { VoucherStatus } = require('../models')
const wallets = require('../models/wallets')
const vouchers = require('../models/vouchers')
const depositHistory = require('./depositHistory')

const INVALID_WALLET = 'invalid_wallet'
const INVALID_VOUCHER = 'invalid_voucher'
const ILLEGAL_STATUS_OPERATION = 'illegal_status_operation'

function attachNewWallet (playerId, balance = 0) {
  balance = Math.max(balance, 0)
  return wallets.create(playerId, balance)
}

async function deposit (playerId, code) {
  const [wallet, voucher] = await Promise.all([
    wallets.findByOwner(playerId),
    vouchers.findByCode(code)
  ])

  if (!wallet) {
    throw new Error(INVALID_WALLET)
  } else if (!voucher) {
    throw new Error(INVALID_VOUCHER)
  } else if (!VoucherStatus.canMakeTransition(voucher.status, VoucherStatus.APPLIED)) {
    throw new Error(ILLEGAL_STATUS_OPERATION)
  }

  const [updatedWallet] = await Promise.all([
    wallets.update(wallet.walletId, {
      balance: wallet.balance + voucher.amount
    }),
    vouchers.update(voucher.code, {
      status: VoucherStatus.APPLIED
    })
  ])

  await depositHistory.insertNewRecord(playerId, voucher.voucherId)

  return updatedWallet
}

module.exports = {
  INVALID_WALLET,
  INVALID_VOUCHER,
  ILLEGAL_STATUS_OPERATION,
  attachNewWallet,
  deposit
}
