module.exports = function enums (enums) {
  if (!Array.isArray(enums)) {
    enums = Array.prototype.slice.call(arguments)
  }

  return enums.reduce((map, enumLiteral, index) => {
    const hasLiteral = map.hasOwnProperty(enumLiteral)
    const hasValue = map.hasOwnProperty(index)

    if (hasLiteral && hasValue) {
      throw new Error(`collision exists between ${enumLiteral} and ${index}`)
    } else if (hasLiteral) {
      throw new Error(`${enumLiteral} is repeated`)
    }

    map[enumLiteral] = index
    map[index] = enumLiteral
    return map
  }, {})
}
