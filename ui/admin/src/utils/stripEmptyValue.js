export default function stripEmptyValue (object) {
  return Object
    .entries(object)
    .reduce((ret, [key, val]) => {
      const isEmpty = val === undefined || val === null || val === ''
      if (!isEmpty) {
        ret[key] = val
      }
      return ret
    }, {})
}
