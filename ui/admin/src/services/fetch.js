import { resolve, parse, format } from 'url'
import moment from 'moment'
import { getJWT } from './localStorage'

function formatRequest (url, opt) {
  opt.method = (opt.method || 'GET').toUpperCase()
  switch (opt.method) {
    case 'GET':
    case 'DELETE':
      return formatGetDelRequest(url, opt)
    case 'POST':
    case 'PUT':
      return formatPostPutRequest(url, opt)
    default:
      throw new Error(`Not supported http method: ${opt.method}`)
  }
}

function formatGetDelRequest (url, opt) {
  const { query, ...other } = opt
  return {
    url: format({
      ...parse(url),
      query
    }),
    opt: other
  }
}

function formatPostPutRequest (url, opt) {
  const urlObj = parse(url)
  delete urlObj.query
  delete urlObj.hash
  delete opt.query
  return {
    url: format(urlObj),
    opt: {
      ...opt,
      body: typeof opt.body === 'string'
        ? opt.body
        : JSON.stringify(opt.body)
    }
  }
}

function handleErrorResponse (response) {
  return response
    .text()
    .then(errPayload => {
      const err = new Error('Fetch api error')
      try {
        // first, check if err is json
        errPayload = JSON.parse(errPayload)
        err.isJSON = true
      } catch (err) {
        err.isJSON = false
      }
      err.status = response.status
      err.payload = errPayload
      if (process.env.NODE_ENV !== 'production') {
        console.error(`${errPayload.message}\n${errPayload.stack}`)
      }
      return Promise.reject(err)
    })
}

function attachCommonHeaders (headers = {}) {
  headers = {
    ...headers,
    'Content-Type': 'application/json'
  }

  const jwt = getJWT()
  if (jwt) {
    headers['Authorization'] = `JWT ${jwt}`
  }

  return headers
}

export function fetchJSON (url, opt = {}) {
  opt.headers = attachCommonHeaders(opt.headers)
  const AP = process.env.AP
  url = resolve(AP, url)

  const request = formatRequest(url, opt)
  return window.fetch(request.url, request.opt)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return handleErrorResponse(response)
      }
    })
}

export function fetchApi (url, opt = {}) {
  opt.headers = attachCommonHeaders(opt.headers)
  url = resolve(process.env.AP, url)

  const request = formatRequest(url, opt)
  return window.fetch(request.url, request.opt)
    .then(response => {
      if (response.ok) {
        return Promise.resolve()
      } else {
        return handleErrorResponse(response)
      }
    })
}

function stripEmptyValue (object) {
  return Object
    .entries(object)
    .reduce((ret, [key, val]) => {
      const isEmpty = val === undefined || val === null || isNaN(val) || val === ''
      if (!isEmpty) {
        ret[key] = val
      }
      return ret
    }, {})
}

function turnMomentToDate (object) {
  return Object
    .entries(object)
    .reduce((ret, [key, val]) => {
      ret[key] = moment.isMoment(val) ? val.toDate() : val
      return ret
    }, {})
}

export function formatBody (body) {
  return turnMomentToDate(stripEmptyValue(body))
}
