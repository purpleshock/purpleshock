function diff (a, b) {
  return Object.entries(b)
  .filter(([key, val]) => {
    const containsKey = a.hasOwnProperty(key)
    const isNotEqual = a[key] !== val
    return containsKey && isNotEqual
  })
  .reduce((ret, [key, val]) => {
    ret[key] = val
    return ret
  }, {})
}

function getPropertiesFilterFn (...fields) {
  const filter = fields.reduce((acc, field) => {
    acc[field] = true
    return acc
  }, {})

  return o => Object.entries(o)
  .filter(([key, val]) => {
    const isInFilter = filter[key]
    const isValidValue = val !== null && val !== undefined
    return isInFilter && isValidValue
  })
  .reduce((acc, [key, val]) => {
    acc[key] = val
    return acc
  }, {})
}

module.exports = {
  diff,
  getPropertiesFilterFn
}
