const express = require('express')

const me = express.Router()

me.get('/', (req, res) => {
  res.json(req.user)
})

module.exports = me
