module.exports = function logger () {
  if (process.env.NODE_ENV === 'development') {
    const args = Array.prototype.slice.call(arguments)
    console.log.apply(console, args)
  }
}
