const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { NODE_ENV } = require('./config/env')

const app = express()

if (NODE_ENV !== 'test') {
  app.use(logger('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/v1', require('./middlewares/v1'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    err.status = 400
  }
  res.status(err.status || 500)
  if (NODE_ENV === 'production') {
    res.end()
  } else {
    res.json({
      message: err.message,
      stack: err.stack
    })
  }
})

module.exports = app
