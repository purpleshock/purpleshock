import * as querystring from 'querystring'

export function stringify (query) {
  query = Object.keys(query).reduce((q, key) => {
    const val = query[key]
    if (val !== null && val !== undefined && val !== '') {
      q[key] = val
    }
    return q
  }, {})
  return querystring.stringify(query)
}
