module.exports = joi => {
  return {
    name: 'voucherStatus',
    base: joi.string(),
    pre (value, state, options) {
      return value.toUpperCase()
    }
  }
}
