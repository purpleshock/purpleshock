import { fetchJSON } from './fetch'
import formatRequest from '@/utils/formatRequest'

export function getVoucher (code) {
  return fetchJSON(`/api/v1/vouchers/${code}`)
}

export function getVoucherSuggest (term, size) {
  return fetchJSON('/api/v1/vouchers', {
    query: formatRequest({
      term,
      size
    })
  })
}
