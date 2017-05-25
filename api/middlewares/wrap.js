const { NODE_ENV } = require('../config/env')

module.exports = function wrap (asyncFunc) {
  return function (req, res, next) {
    asyncFunc(req, res).catch(err => {
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
  }
}
