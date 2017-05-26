const express = require('express')
const bodyParser = require('body-parser')

module.exports = function mockApp (middlewares) {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  Object
    .entries(middlewares)
    .forEach(([path, handler]) => {
      app.use(`/${path}`, handler)
    })

  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.end(`
      <h1>${err.message}</h1>
      <h2>${err.statusCode}</h2>
      <pre>${err.stack}</pre>
    `)
  })

  return app
}
