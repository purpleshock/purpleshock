import { fetchJSON } from './fetch'
import formatRequest from '../utils/formatRequest'

export function createVouchers (formData) {
  return fetchJSON('/api/v1/vouchers', {
    method: 'POST',
    body: formatRequest(formData)
  })
}

export function getVouchers (validAt, expiredAt, page, size) {
  return fetchJSON('/api/v1/vouchers', {
    query: formatRequest({
      validAt,
      expiredAt,
      page,
      size
    })
  })
}
