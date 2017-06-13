import { fetchJSON } from './fetch'

export function getVoucher (code) {
  return fetchJSON(`/api/v1/vouchers/${code}`)
}
