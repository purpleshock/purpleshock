import { fetchJSON } from './fetch'

export function getUserInfo () {
  return fetchJSON('/api/v1/me')
}
