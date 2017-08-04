const express = require('express')
const wrapper = require('../wrapper')
const wallet = require('../../services/wallet')
const depositHistory = require('../../services/depositHistory')
const formatters = require('./formatters/deposit')

const deposit = express.Router()

deposit.post('/', wrapper({
  body: formatters.depositBody,
  response: formatters.depositResponse,
  errors: {
    [wallet.ILLEGAL_STATUS_OPERATION]: 400,
    [wallet.INVALID_WALLET]: 400,
    [wallet.INVALID_VOUCHER]: 400
  },
  handler (req, res) {
    const { playerId } = req.user
    const { code } = req.body
    return wallet.deposit(playerId, code)
  }
}))

deposit.get('/', wrapper({
  query: formatters.getDepositHistoryQuery,
  response: formatters.getDepositHistoryResponse,
  errors: {
    [depositHistory.NO_HISTORY]: 404
  },
  async handler (req, res) {
    const { playerId } = req.user
    const { from, to, page, pagination } = req.query
    const histories = await depositHistory.findBetween(playerId, from, to, page, pagination)
    return histories
  }
}))

module.exports = deposit
