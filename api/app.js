const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const auth = require('./middlewares/auth')()

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(auth.initialize())

app.use('/api/v1', require('./middlewares/v1')(auth))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

module.exports = app
