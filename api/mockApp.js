const express = require('express')

module.exports = function mockApp (middlewares) {
  const app = express()
  Object
    .entries(middlewares)
    .forEach(([path, handler]) => {
      app.use(`/${path}`, handler)
    })
  return app
}
