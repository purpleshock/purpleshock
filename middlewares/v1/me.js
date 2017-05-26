const express = require('express')
const wrap = require('../wrap')

const me = express.Router()

me.get('/', wrap(async (req, res) => {
  res.json(req.user)
}))

module.exports = me
