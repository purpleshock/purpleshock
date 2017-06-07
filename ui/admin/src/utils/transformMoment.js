import moment from 'moment'

export function toDate (object) {
  return Object
    .entries(object)
    .reduce((ret, [key, val]) => {
      ret[key] = moment.isMoment(val) ? val.toDate() : val
      return ret
    }, {})
}

export function toUnixTime (object) {
  return Object
    .entries(object)
    .reduce((ret, [key, val]) => {
      ret[key] = moment.isMoment(val) ? val.unix() : val
      return ret
    }, {})
}
