const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const csurf = require('csurf')
const axios = require('axios')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 7071
process.env.AP = process.env.AP || 'http://localhost:7070'
const secret = process.env.SECRET || 'secret'
const clientMaxAge = process.env.CLIENT_MAX_AGE || 60000

const app = next({ dev: process.env.NODE_ENV !== 'production' })
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
    app.render(req, res, '/', req.query)
  })

  server.get('/voucher/:voucherId', (req, res) => {
    app.render(req, res, '/Voucher', req.params)
  })

  server.get('*', (req, res) => {
    handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
