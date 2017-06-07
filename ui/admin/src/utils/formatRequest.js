import stripEmptyValue from './stripEmptyValue'
import { toUnixTime } from './transformMoment'

export default function formatRequest (body) {
  return toUnixTime(stripEmptyValue(body))
}
