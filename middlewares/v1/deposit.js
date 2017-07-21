const express = require('express')
const joi = require('./joi')
const wrapper = require('../wrapper')
const wallet = require('../../services/wallet')
const depositHistory = require('../../services/depositHistory')

const deposit = express.Router()

deposit.post('/', wrapper({
  body: joi.object().keys({
    code: joi.string().required()
  }),
  response: joi.object().keys({
    balance: joi.number().required()
  }),
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
  query: joi.object().keys({
    from: joi.unix().required(),
    to: joi.unix().required(),
    page: joi.number().required(),
    pagination: joi.number().required()
  }),
  response: joi.array().items(
    joi.object().keys({
      createdAt: joi.unix(),
      code: joi.string(),
      amount: joi.number()
    })
  ),
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
