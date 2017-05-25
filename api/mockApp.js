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

  return app
}
