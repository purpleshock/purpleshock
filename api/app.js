const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const auth = require('./middlewares/auth')()
const { NODE_ENV } = require('./config/env')

const app = express()

if (NODE_ENV !== 'test') {
  app.use(logger('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(auth.initialize())

app.use('/api/v1', require('./middlewares/v1')(auth))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  if (NODE_ENV === 'production') {
    res.end()
  } else {
    res.end(`
      <h1>${err.message}</h1>
      <h2>${err.statusCode}</h2>
      <pre>${err.stack}</pre>
    `)
  }
})

module.exports = app
