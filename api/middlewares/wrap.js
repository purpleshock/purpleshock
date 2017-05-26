module.exports = function wrap (asyncFunc) {
  return function (req, res, next) {
    asyncFunc(req, res).catch(next)
  }
}
