const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const axios = require('axios')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cache = require('./utils/cache')

const port = process.env.PORT || 7071
process.env.AP = process.env.AP || 'http://localhost:7070'
const secret = process.env.SECRET || 'secret'

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const renderWithCache = cache(app)
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(cookieParser())

  server.use(session({
    secret,
    resave: false,
    saveUninitialized: true,
    httpOnly: true
  }))

  // Login, for getting browser cookie on initial render
  server.post('/login', (req, res, next) => {
    axios.post(`${process.env.AP}/api/v1/admins/session`, {
      mail: req.body.mail,
      password: req.body.password
    })
    .then(response => {
      // set cookie so that the SSR server can access server side request
      Object.keys(response.data).forEach(key => {
        res.cookie(key, response.data[key])
      })
      // pass down token so that browser can store token in localStorage
      res.json(response.data)
    })
    .catch(next)
  })

  server.get('/', (req, res) => {
    renderWithCache(req, res, '/', req.query)
  })

  server.get('/voucher/:voucherCode', (req, res) => {
    renderWithCache(req, res, '/voucher', req.params)
  })

  server.get('/voucher-management', (req, res) => {
    renderWithCache(req, res, '/voucher-management', req.query)
  })

  server.get('/voucher-management/:voucherId', (req, res) => {
    renderWithCache(req, res, '/voucher-management', req.params)
  })

  server.get('*', (req, res) => {
    handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

process.on('uncaughtException', err => {
  console.error(err)
})

process.on('unhandledRejection', (reason, p) => {
  console.error(reason)
})
