const LRUCache = require('lru-cache')
const logger = require('./logger')

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60
})

const defaultOption = {
  cacheKey (req) {
    return req.url
  }
}

module.exports = (next, option = defaultOption) => async (req, res, path, vars) => {
  const key = option.cacheKey(req)

  if (ssrCache.has(key)) {
    logger(`Hitting cache ${key}`)
    return res.send(ssrCache.get(key))
  }

  try {
    logger(`Missing cache ${key}`)
    const html = await next.renderToHTML(req, res, path, vars)
    ssrCache.set(key, html)
    res.send(html)
  } catch (err) {
    next.renderError(err, req, res, path, vars)
  }
}