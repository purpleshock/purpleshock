const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.status(err.status || 500)

  if (app.get('env') === 'production') {
    res.end()
  } else {
    res.end(`
      <h1>${err.message}</h1>
      <h2>${err.status}</h2>
      <pre>${err.stack}</pre>
    `)
  }
})

module.exports = app
